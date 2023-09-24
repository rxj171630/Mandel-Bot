const ms = require("ms");
setTimeout(() => console.log("✅ | Enabled auto-publish module"), ms("2 sec"));

module.exports = (client) => {
  //Auto publisher
  client.on("messageCreate", (message) => {
    if (message.channel.type === "GUILD_NEWS") {
      message
        .crosspost()
        .then(() => console.log("Published announcement"))
        .catch(console.error);
    }
  });
};
