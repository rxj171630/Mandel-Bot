const { SlashCommandBuilder } = require("discord.js");
const ms = require("ms");

setTimeout(() => console.log("Enabled ping module"), ms("2 sec"));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong!"),
  async execute(interaction) {
    await interaction.reply("pong!");
  },
};
