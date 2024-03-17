const ms = require("ms");
const { Notify, TwitchExtension } = require("yt-notifier");
const api = process.env.youtubeAPI;
const youtubeSchema = require("../schemas/youtubeSchema.js");

module.exports = (client) => {
  client.notify = new Notify({
    apiKey: api,
  });

  client.notify.on("ready", async () => {
    setTimeout(() => console.log("✅ | Enabled youtube module"), ms("0.5 sec"));
  });

  client.notify.on("newVideo", async (items) => {
    console.log(items);
  });
};
