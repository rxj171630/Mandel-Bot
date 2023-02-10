const { ClientPresence, GatewayIntentBits, Client, Collection, ActivityType } = require('discord.js');
require('dotenv/config');
const fs = require('node:fs');
const path = require('node:path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

client.commands = new Collection();


const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles){
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ('data' in command && 'execute' in command){
        client.commands.set(command.data.name, command);
    }
    else {
        console.log('[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.');
    }
}


client.on('ready', ()=> {
    console.log('The bot is running!');
    client.user.setActivity('with those 1s and 0s', {type: ActivityType.Playing});
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if(!command){
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try{
        await command.execute(interaction);
    } catch (error){
        console.error(error);
        await interaction.reply({content: 'There was an error executing this command!', ephemeral: true});
    }
});


client.login(process.env.TOKEN);