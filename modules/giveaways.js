const ms = require("ms");
setTimeout(() => console.log("✅ | Enabled giveaways module"), ms("2 sec"));

module.exports = (client) => {
  const { GiveawaysManager } = require("discord-giveaways");

  client.GiveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    default: {
      botsCanWin: false,
      embedColor: "#F5D142",
      embedColorEnd: "#FF0000",
      reaction: "🎉",
    },
  });
};
