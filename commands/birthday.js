const { SlashCommandBuilder, messageLink } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const ms = require("ms");
const birthdaySchema = require("../schemas/birthdaySchema.js");

function getId(user) {
  return user.replace(/[^A-Za-z0-9]/g, "");
}

function formatDay(day) {
  if (day % 10 == 1) {
    formatted = `${day}st`;
  } else if (day % 10 == 2) {
    formatted = `${day}nd`;
  } else if (day % 10 == 3) {
    formatted = `${day}rd`;
  } else {
    formatted = `${day}th`;
  }
  return formatted;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("birthday")
    .setDescription("Manage Birthdays")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("add")
        .setDescription("Add your birthday")
        .addStringOption((option) =>
          option
            .setName("month")
            .setDescription("Select the month")
            .setRequired(true)
            .addChoices(
              { name: "January", value: "January" },
              { name: "February", value: "February" },
              { name: "March", value: "March" },
              { name: "April", value: "April" },
              { name: "May", value: "May" },
              { name: "June", value: "June" },
              { name: "July", value: "July" },
              { name: "August", value: "August" },
              { name: "September", value: "September" },
              { name: "October", value: "October" },
              { name: "November", value: "November" },
              { name: "December", value: "December" }
            )
        )
        .addIntegerOption((option) =>
          option
            .setName("day")
            .setDescription("Enter the date")
            .setRequired(true)
            .setMinValue(1)
            .setMaxValue(31)
        )
        .addIntegerOption((option) =>
          option
            .setName("year")
            .setDescription("Enter the year (YYYY):")
            .setRequired(true)
            .setMinValue(1900)
            .setMaxValue(new Date().getFullYear())
        )
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("list").setDescription("View all registered birthdays")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("remove").setDescription("Remove your birthday")
    ),
  async execute(client, interaction) {
    if (!interaction.guild) {
      return;
    }
    const data = await birthdaySchema.find({
      GuildID: interaction.guild.id,
    });

    let user = interaction.user;
    let guildID = interaction.guild.id;
    let channelID = interaction.guild.channels.cache.find((channel) =>
      channel.name.includes("general")
    );

    if (interaction.options.getSubcommand() === "add") {
      let birthdayDay = interaction.options.getInteger("day");
      let birthdayMonth = interaction.options.getString("month");
      let birthdayYear = interaction.options.getInteger("year");

      if (
        !data ||
        !(await birthdaySchema.findOne({
          GuildID: guildID,
          ChannelID: channelID,
          User: user,
        }))
      ) {
        await birthdaySchema.create({
          GuildID: guildID,
          ChannelID: channelID,
          User: user,
          Day: birthdayDay,
          Month: birthdayMonth,
          Year: birthdayYear,
        });

        await interaction.reply({
          content: `${birthdayMonth} ${formatDay(
            birthdayDay
          )}, ${birthdayYear} added.`,
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "ERROR: Your birthday was already added previously.",
          ephemeral: true,
        });
        return;
      }
    } else if (interaction.options.getSubcommand() === "list") {
      if (
        data &&
        (await birthdaySchema.findOne({
          GuildID: guildID,
        }))
      ) {
        embed = [];
        await interaction.guild.members.fetch();

        let present_date = new Date();

        data.forEach(async (i) => {
          member = interaction.guild.members.cache.get(`${getId(i.User)}`);

          let birthday = new Date(
            present_date.getFullYear(),
            client.months.indexOf(i.Month),
            i.Day
          );
          if (
            present_date.getMonth() >= client.months.indexOf(i.Month) &&
            present_date.getDate() >= i.Day
          ) {
            birthday.setFullYear(birthday.getFullYear() + 1);
          }
          let daysUntilNext = Math.round(
            (birthday.getTime() - present_date.getTime()) / ms("1 day")
          );

          await embed.push(
            new EmbedBuilder()
              .setTitle(`${member.displayName}`)
              .setColor("Grey")
              .addFields(
                {
                  name: "Next Birthday",
                  value: `${i.Month} ${formatDay(
                    i.Day
                  )}, ${birthday.getFullYear()}`,
                  inline: false,
                },
                {
                  name: "Days Until Next Birthday:",
                  value: `${daysUntilNext}`,
                  inline: false,
                }
              )
              .setThumbnail(member.displayAvatarURL({ extension: "png" }))
          );
        });

        await interaction.reply({
          content: "## Registered birthdays: ##",
          embeds: embed,
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "## No birthdays registered. ##",
          ephemeral: true,
        });
      }
    } else if (interaction.options.getSubcommand() === "remove") {
      birthdaySchema.deleteMany({ GuildID: guildID, User: user }).then(
        await interaction.reply({
          content: "Successfully removed your birthday.",
          ephemeral: true,
        })
      );
    }
  },
};
