const { SlashCommandBuilder } = require("discord.js");
const Polls = require("discord-polls");
const ms = require("ms");

setTimeout(() => console.log("Enabled poll module"), ms("2 sec"));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Starts a poll")
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("The title of the poll.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("choices")
        .setDescription(
          "The choices of the poll. *Separate each choice by a dash (-)*"
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("emojis")
        .setDescription(
          "The emojis of the poll. *Separate each emoji by a dash (-)*"
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("duration")
        .setDescription("The duration of the poll")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("color")
        .setDescription(
          "The color of the poll's embed. (Use hex format, #FFFFFF by default)"
        )
        .setRequired(false)
    ),
  async execute(client, interaction) {
    const title = interaction.options.getString("title");
    const choices = interaction.options.getString("choices");
    var duration;
    if (interaction.options.getString("duration")) {
      duration = parseInt(ms(interaction.options.getString("duration"))) / 1000;
    } else {
      duration = 24 * 60 * 60;
    }
    const color = interaction.options.getString("color") ?? "#FFFFFF";
    const emojis = interaction.options.getString("emojis");
    const forceEndEmoji = "❌";

    const choicesArray = choices.split("-").map((choice) => choice.trim()); // Map the choices to an array.
    const emojisArray = emojis.split("-").map((emoji) => emoji.trim()); // Map the emojis to an array.

    // call the startPoll method
    Polls.startPoll(
      interaction,
      title,
      choicesArray,
      duration,
      color,
      emojisArray,
      forceEndEmoji
    );
  },
};
