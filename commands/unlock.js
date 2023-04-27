const {
  ButtonBuilder,
  SlashCommandBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unlock")
    .setDescription('Posts the "unlock channels" embed to this channel'),
  async execute(client, interaction) {
    const embed = new EmbedBuilder()
      .setColor(`#70a750`)
      .setTitle("✅ Server Verification")
      .setDescription(
        "Before you can view the rest of the server, you must prove that you are not a bot account. To do so, somply click the button attached to this message."
      );
    const button = new ButtonBuilder()
      .setCustomId("unlock")
      .setLabel("Verify")
      .setEmoji("✅")
      .setStyle(ButtonStyle.Success);
    const row = new ActionRowBuilder().addComponents(button);
    await interaction.reply({ embeds: [embed], components: [row] });
  },
};
