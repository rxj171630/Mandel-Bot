const ms = require("ms");
const youtube = require("youtube-alert");

setTimeout(() => console.log("Enabled youtube module"), ms("2 sec"));

module.exports = (client) => {
  client.YoutubeClient = new Youtube();

  client.YoutubeClient.on("newPost", (client, data) => {
    console.log(data);
  });
};
