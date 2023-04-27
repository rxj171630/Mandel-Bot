const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("giveaway")
    .setDescription("Manage giveaways")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("start")
        .setDescription("Start a giveaway")
        .addStringOption((option) =>
          option
            .setName("duration")
            .setDescription("How long to wait before drawing a winner?")
            .setRequired(true)
        )
        .addIntegerOption((option) =>
          option
            .setName("winners")
            .setDescription("How many winners?")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("prize")
            .setDescription("What is the prize?")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("reroll")
        .setDescription("Reroll a giveaway")
        .addStringOption((option) =>
          option
            .setName("message_id")
            .setDescription("What is the message id for the giveaway?")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("end")
        .setDescription("End a giveaway")
        .addStringOption((option) =>
          option
            .setName("message_id")
            .setDescription("What is the message id for the giveaway?")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("delete")
        .setDescription("Delete a giveaway")
        .addStringOption((option) =>
          option
            .setName("message_id")
            .setDescription("What is the message id for the giveaway?")
            .setRequired(true)
        )
    ),
  execute: async (client, interaction) => {
    if (interaction.options.getSubcommand() === "start") {
      const duration = interaction.options.getString("duration");
      const winnerCount = interaction.options.getInteger("winners");
      const prize = interaction.options.getString("prize");

      //console.log(client);

      client.GiveawaysManager.start(interaction.channel, {
        duration: ms(duration),
        winnerCount,
        prize,
        messages: {
          winMessage: "Congratulations, {winners}! You won **{this.prize}**!",
        },
      }).then((data) => {
        //console.log(data); // {...} (messageId, end date and more)
      });
      // And the giveaway has started!
    } else if (interaction.options.getSubcommand() == "end") {
      const messageId = interaction.options.getString("message_id");
      client.giveawaysManager
        .end(messageId)
        .then(() => {
          interaction.reply("Success! Giveaway ended!");
        })
        .catch((err) => {
          interaction.reply(
            `An error has occurred, please check and try again.\n\`${err}\``
          );
        });
    } else if (interaction.options.getSubcommand() == "delete") {
      const messageId = interaction.options.getString("message_id");
      client.giveawaysManager
        .delete(messageId)
        .then(() => {
          interaction.reply("Success! Giveaway deleted!");
        })
        .catch((err) => {
          interaction.reply(
            `An error has occurred, please check and try again.\n\`${err}\``
          );
        });
    } else if (interaction.options.getSubcommand() == "reroll") {
      const messageId = interaction.options.getString("message_id");
      client.giveawaysManager
        .reroll(messageId)
        .then(() => {
          interaction.reply("Success! Giveaway rerolled!");
        })
        .catch((err) => {
          interaction.reply(
            `An error has occurred, please check and try again.\n\`${err}\``
          );
        });
    }
    await interaction.reply("Done!");
    setTimeout(() => interaction.deleteReply(), ms("2s"));
  },
};
