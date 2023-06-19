const {
  ButtonBuilder,
  SlashCommandBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const youtubeSchema = require("../schemas/youtubeSchema.js");
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
    console.log(`Channel: ${channel.id}`);
    if (interaction.options.getSubcommand() === "subscribe") {
      const data = await youtubeSchema.findOne({
        ID: id,
      });

      if (!data) {
        youtubeSchema
          .create({
            ID: id,
            Channel: channel.id,
          })
          .then((result) => {
            console.log(result);
          });
        client.Notifier.addChannels([id]);
        await interaction.reply(
          `Sucessfully subscribed, uploads will sent to ${channel}`
        );
      }
    } else if (interaction.options.getSubcommand() === "unsubscribe") {
      console.log("Unsubscribed");
      youtubeSchema.deleteMany({ ID: `${id}` }).then(
        client.Notifier.removeChannels([id]),
        await interaction.reply({
          content: "Successfully unsubscribed",
        })
      );
    }
  },
};
