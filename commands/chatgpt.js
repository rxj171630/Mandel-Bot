const {SlashCommandBuilder} = require('discord.js');
const {Configuration, OpenAIApi} = require("openai");

const configuration = new Configuration({
    apiKey:process.env.chatGPT,
});
const openai = new OpenAIApi(configuration);

async function runCompletion (input, inputModel) {
    console.log(`INPUT:    ${input}`);
    const completion = await openai.createCompletion({
      model: inputModel,
      prompt: input,
      max_tokens: 1024
    });
    console.log(`CREATING COMPLETION: ${completion.data.choices[0].text}`)
    return (completion.data.choices[0].text);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('chatgpt')
        .setDescription('Ask chatgpt something!')
        .addStringOption(option =>
            option.setName('prompt')
            .setDescription('What do you want to ask?')
            .setRequired(true))
        .addStringOption(option => 
            option.setName('model')
            .setDescription("Do you want to use a specific AI model?")
            .setRequired(false)
            .addChoices(
                { name: 'TEXT: davinci-003(default)', value: 'text-davinci-003'},
                { name: 'TEXT: curie-001', value: 'text-curie-001'},
                { name: 'TEXT: babbage-001', value: 'text-babbage-001'},
                { name: 'TEXT: ada-001', value: 'text-ada-001'},
                { name: 'CODE: davinci-002', value: 'code-davinci-002'},
                { name: 'CODE: cushman-001', value: 'code-cushman-001'},
            )),
    async execute(interaction){
        const prompt = interaction.options.getString('prompt');
        const model = interaction.options.getString('model') ?? 'text-davinci-003';
        let output = "";
        console.log(`PROMPT:  ${prompt}`);
        await interaction.deferReply({ephemeral:false});
        try{
            output = await runCompletion(prompt, model);
            if (model.includes("code")){
                output = `\`\`\` ${output} \`\`\``;
            }
            if (output.length > 2000){
                output = "My response exceeds the character limit, try again with a less complex prompt.";
            }
        }
        catch(error){
            output = "My response exceeds the character limit, try again with a less complex prompt."
        }
        interaction.editReply(`${interaction.member.displayName} asked: ${prompt}\n━━━━━━━━━━━━━━━━━━━━━━━━━    [｡◕‿◕｡]    ━━━━━━━━━━━━━━━━━━━━━━━━━\n${output}\n━━━━━━━━━━━━━━━━━━━━━━━━━    [｡◕‿◕｡]    ━━━━━━━━━━━━━━━━━━━━━━━━━`);
    }
}