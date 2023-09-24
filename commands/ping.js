const { SlashCommandBuilder } = require("discord.js");
const ms = require("ms");

setTimeout(() => console.log("✅ | Enabled ping module"), ms("2 sec"));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong!"),
  async execute(client, interaction) {
    const sent = await interaction.reply({
      content: "Pinging...",
      fetchReply: true,
    });
    interaction.editReply(
      `Pong! Latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`
    );
  },
};
