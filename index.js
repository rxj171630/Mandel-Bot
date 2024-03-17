const {
  ClientPresence,
  GatewayIntentBits,
  Client,
  Collection,
  ActivityType,
} = require("discord.js");
require("dotenv/config");
const fs = require("node:fs");
const path = require("node:path");
const { stripIndent } = require("common-tags");
const colors = require("colors");
const ms = require("ms");
const mongoose = require("mongoose");

const giveaways = require("./modules/giveaways.js");
const autopublish = require("./modules/autopublish.js");
const unlock = require("./modules/unlock.js");
const youtube = require("./modules/youtube.js");
const birthday = require("./modules/birthday.js");



const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
  ],
});


client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      '[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.'
    );
  }
}

console.log(
  stripIndent`********************************************`.magenta.bold
);
console.log(
  stripIndent`    ▪                                          ▪
      ░█▄█░█▀█░█▀█░█▀▄░█▀▀░█░░░░░░░█▀▄░█▀█░▀█▀ 
      ░█░█░█▀█░█░█░█░█░█▀▀░█░░░▄▄▄░█▀▄░█░█░░█░
      ░▀░▀░▀░▀░▀░▀░▀▀░░▀▀▀░▀▀▀░░░░░▀▀░░▀▀▀░░▀░         
    ▪ by Rahul Javalagi - github.com/rxj171630 ▪`.blue
);
console.log(
  stripIndent`********************************************`.magenta.bold
);

async function startDatabase() {
  if (!process.env.mongoDBURI) return;
  await mongoose.connect(process.env.mongoDBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  if (mongoose.connect) {
    console.log("🔗 | Connected to Database");
  }
}

client.on("ready", () => {
  client.user.setActivity("with those 1s and 0s", {
    type: ActivityType.Playing,
  });
  setTimeout(() => {
    startDatabase();
    autopublish(client);
    giveaways(client);
    unlock(client);
    youtube(client);
    birthday(client);
  }, ms("1s"));
  setTimeout(() => {
    console.log(stripIndent`Ready to go!`.green.bold);
  }, ms("3s"));
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(client, interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error executing this command!",
      ephemeral: true,
    });
  }
});

client.login(process.env.TOKEN);
