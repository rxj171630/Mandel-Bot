const ms = require("ms");

setTimeout(() => console.log("Enabled youtube module"), ms("2 sec"));

module.exports = (client) => {
  const youtube = require("discord-bot-youtube-notifications");
  client.Notifier = new youtube.notifier(client, {
    message: "{author} just uploaded a new video: **{title}**\nurl : {url}\n",
  });

  client.Notifier.on("upload", (client, data) => {
    console.log(data);
  });
};
