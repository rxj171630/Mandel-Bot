const { SlashCommandBuilder } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");
const ms = require("ms");

setTimeout(() => console.log("Enabled chatgpt module"), ms("2 sec"));

async function chatGPT(prompt, interaction) {
  const { ChatGPTAPI } = await import("chatgpt");
  const api = new ChatGPTAPI({ apiKey: process.env.chatGPT, debug: false });
  let res = "";
  let conversationID = "";
  let parentID = "";
  try {
    if (parentID != undefined) {
      console.log("NO PREV CONVO");
      res = await api.sendMessage(prompt, {
        conversationId: conversationID,
        parentMessageId: parentID,
        onProgress: (partialResponse) =>
          interaction.editReply(
            `${interaction.member.displayName} asked: ${prompt}\n━━━━━━━━━━━━━━━━━━━━━━━━━    [｡◕‿◕｡]    ━━━━━━━━━━━━━━━━━━━━━━━━━\n${partialResponse.text} [...]\n\n━━━━━━━━━━━━━━━━━━━━━━━━━    [｡◕‿◕｡]    ━━━━━━━━━━━━━━━━━━━━━━━━━`
          ),
      });
    } else {
      res = await api.sendMessage(prompt, {
        onProgress: (partialResponse) =>
          interaction.editReply(
            `${interaction.member.displayName} asked: ${prompt}\n━━━━━━━━━━━━━━━━━━━━━━━━━    [｡◕‿◕｡]    ━━━━━━━━━━━━━━━━━━━━━━━━━\n${partialResponse.text} [...]\n\n━━━━━━━━━━━━━━━━━━━━━━━━━    [｡◕‿◕｡]    ━━━━━━━━━━━━━━━━━━━━━━━━━`
          ),
      });
    }
    // res = await api.sendMessage('What is OpenAI?')
    // interaction.editReply(res.text);
    // res = await api.sendMessage('Can you expand on that?', {
    //     conversationId: res.conversationId,
    //     parentMessageId: res.id
    // })
    // setTimeout(() => {interaction.editReply(res.text);}, 5000);
    conversationID = res.conversationId;
    parentID = res.id;
    interaction.editReply(
      `${interaction.member.displayName} asked: ${prompt}\n━━━━━━━━━━━━━━━━━━━━━━━━━    [｡◕‿◕｡]    ━━━━━━━━━━━━━━━━━━━━━━━━━\n${res.text}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━    [｡◕‿◕｡]    ━━━━━━━━━━━━━━━━━━━━━━━━━`
    );
  } catch (error) {
    interaction.editReply(
      `${interaction.member.displayName} asked: ${prompt}\n━━━━━━━━━━━━━━━━━━━━━━━━━    [｡x‿x｡]    ━━━━━━━━━━━━━━━━━━━━━━━━━\nSorry, something went wrong..\n\n━━━━━━━━━━━━━━━━━━━━━━━━━    [｡x‿x｡]    ━━━━━━━━━━━━━━━━━━━━━━━━━`
    );
    console.log(error);
  }
}

const configuration = new Configuration({
  apiKey: process.env.chatGPT,
});
const openai = new OpenAIApi(configuration);

async function runCompletion(input, inputModel) {
  console.log(`INPUT:    ${input}`);
  const completion = await openai.createCompletion({
    model: inputModel,
    prompt: input,
    max_tokens: 1024,
  });
  console.log(`CREATING COMPLETION: ${completion.data.choices[0].text}`);
  return completion.data.choices[0].text;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("chatgpt")
    .setDescription("Ask chatgpt something!")
    .addStringOption((option) =>
      option
        .setName("prompt")
        .setDescription("What do you want to ask?")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("model")
        .setDescription("Do you want to use a specific AI model?")
        .setRequired(false)
        .addChoices(
          { name: "TEXT: chatGPT(default)", value: "chatgpt" },
          { name: "TEXT: davinci-003(default)", value: "text-davinci-003" },
          { name: "TEXT: curie-001", value: "text-curie-001" },
          { name: "TEXT: babbage-001", value: "text-babbage-001" },
          { name: "TEXT: ada-001", value: "text-ada-001" },
          { name: "CODE: davinci-002", value: "code-davinci-002" },
          { name: "CODE: cushman-001", value: "code-cushman-001" }
        )
    ),
  async execute(interaction) {
    const prompt = interaction.options.getString("prompt");
    const model = interaction.options.getString("model") ?? "chatgpt";
    let output = "";

    console.log(`PROMPT:  ${prompt}`);
    await interaction.deferReply({ ephemeral: false });
    try {
      if (model != "chatgpt") {
        output = await runCompletion(prompt, model);
        if (model.includes("code")) {
          output = `\`\`\` ${output} \`\`\``;
        }
        if (output.length > 2000) {
          output =
            "My response exceeds discord's character limit, try again with a less complex prompt.";
        }
        interaction.editReply(
          `${interaction.member.displayName} asked: ${prompt}\n━━━━━━━━━━━━━━━━━━━━━━━━━    [｡◕‿◕｡]    ━━━━━━━━━━━━━━━━━━━━━━━━━\n${output}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━    [｡◕‿◕｡]    ━━━━━━━━━━━━━━━━━━━━━━━━━`
        );
      } else {
        interaction.editReply(
          `${interaction.member.displayName} asked: ${prompt}\n━━━━━━━━━━━━━━━━━━━━━━━━━    [｡◕‿◕｡]    ━━━━━━━━━━━━━━━━━━━━━━━━━\n...\n\n━━━━━━━━━━━━━━━━━━━━━━━━━    [｡◕‿◕｡]    ━━━━━━━━━━━━━━━━━━━━━━━━━`
        );
        chatGPT(prompt, interaction);
      }
    } catch (error) {
      output =
        "My response exceeds discord's character limit, try again with a less complex prompt.";
      //console.log(error);
    }
  },
};
