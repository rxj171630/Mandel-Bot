const {
  ButtonBuilder,
  SlashCommandBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");
const { EmbedBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("youtube")
    .setDescription("Manage YouTube notifications")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("subscribe")
        .setDescription("Subscribe to a YouTube channel")
        .addStringOption((option) =>
          option
            .setName("channel-id")
            .setDescription("Youtube Channel ID to subscribe to")
            .setRequired(true)
        )
        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription("Which discord channel to send notifications to")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("unsubscribe")
        .setDescription("Subscribe to a YouTube channel")
        .addStringOption((option) =>
          option
            .setName("channel-id")
            .setDescription("Youtube Channel ID to unsubscribe from.")
            .setRequired(true)
        )
    ),
  async execute(client, interaction) {
    const id = `${interaction.options.getString("channel-id")}`;
    const channel = interaction.options.getChannel("channel");

    console.log(`ID: ${id}`);

    if (interaction.options.getSubcommand() === "subscribe") {
      console.log(`Channel: ${channel.id}`);
      var checkError = false;
      await interaction.reply({ content: `Processing...`, ephemeral: true });
      console.log("Subscribed");
      client.Notifier.addNotifier(id, channel).catch(async (e) => {
        checkError = true;
        await interaction.editReply(`${e}`);
        return;
      });

      if (!checkError) {
        await interaction.editReply({
          content: `Sucessfully subscribed, uploads will sent to ${channel}`,
          ephemeral: true,
        });
      }
    } else if (interaction.options.getSubcommand() === "unsubscribe") {
      console.log("Unsubscribed");
      client.Notifier.removeNotifier(id),
        await interaction.reply({
          content: "Successfully unsubscribed",
          ephemeral: true,
        });
    }
  },
};
