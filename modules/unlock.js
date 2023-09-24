const ms = require("ms");

const memberID = process.env.memberID;
setTimeout(() => console.log("✅ | Enabled unlock module"), ms("2 sec"));

module.exports = (client) => {
  client.on("interactionCreate", async (interaction) => {
    if (interaction.isChatInputCommand() || interaction.customId != "unlock") {
      return;
    } else if (
      interaction.guild.roles.cache.map((role) => role.id).includes(memberID)
    ) {
      user = interaction.user.id;
      if (interaction.guild.members.cache.get(user)._roles.includes(memberID)) {
        interaction.reply("*You already have access to the other channels*");
      } else {
        interaction.guild.members.cache.get(user).roles.add(memberID);
        interaction.reply("*Done*");
      }
    } else {
      interaction.reply(
        "`Error: Could not find the appropriate role in this server.`"
      );
    }
    setTimeout(() => interaction.deleteReply(), ms("2 sec"));
  });
};
