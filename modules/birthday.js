const ms = require("ms");
const cron = require("node-cron");
const birthdaySchema = require("../schemas/birthdaySchema.js");
setTimeout(() => console.log("✅ | Enabled birthday module"), ms("2 sec"));
const { EmbedBuilder } = require("discord.js");
function getId(user) {
  return user.replace(/[^A-Za-z0-9]/g, "");
}

module.exports = async (client) => {
  client.months = new Array(
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  );

  var task = cron.schedule(`0 0 0 * * *`, async () => {
    const data = await birthdaySchema.find({
      Month: `${client.months[new Date().getMonth()]}`,
      Day: `${new Date().getDate()}`,
    });
    data.forEach(async (i) => {
      await client.guilds.fetch();
      guild = await client.guilds.cache.get(i.GuildID);
      await guild.members.fetch();
      member = await guild.members.cache.get(`${getId(i.User)}`);

      guild.channels.fetch();
      channel = await guild.channels.cache.get(getId(i.ChannelID));

      const embed = new EmbedBuilder()
        .setTitle(`Happy Birthday, ${member.displayName}!`)
        .setDescription(
          `They are now ${new Date().getFullYear() - i.Year} years old!`
        )
        .setColor("Gold")
        .setThumbnail(member.displayAvatarURL({ extension: "png" }))
        .setImage(
          "https://www.pngmart.com/files/11/Confetti-Happy-Birthday-PNG-Clipart.png"
        );

      await channel.send({ content: i.User, embeds: [embed] });
    });
  });

  task.start();
};
