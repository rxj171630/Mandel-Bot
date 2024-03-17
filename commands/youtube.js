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
            .setName("channel-link")
            .setDescription("Youtube Channel link to subscribe to")
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
            .setName("channel-link")
            .setDescription("Youtube Channel link to unsubscribe from.")
            .setRequired(true)
        )
    ),
  async execute(client, interaction) {
    if (interaction.options.getSubcommand() === "subscribe") {
      const ytlink = `${interaction.options.getString("channel-link")}`;
      const channel = interaction.options.getChannel("channel");

      await interaction.reply("Processing...");

      console.log(`YT Link: ${ytlink}`);
      console.log(`Channel: ${channel}`);
      const id = await client.notify.getChannelId(ytlink);
      console.log(`Channel ID: ${id}`);
      await client.notify.createListener({ channelId: id });

      await interaction.editReply({
        content: `Sucessfully subscribed`,
        ephemeral: true,
      });
    } else if (interaction.options.getSubcommand() === "unsubscribe") {
      const ytlink = `${interaction.options.getString("channel-link")}`;
      const id = await client.notify.getChannelId(ytlink);
      await client.notify.stopListener({ channelId: id });
      console.log("Unsubscribed");
    }
  },
};
