const ms = require("ms");

setTimeout(() => console.log("Enabled youtube module"), ms("2 sec"));

module.exports = (client) => {
  const ytnotifier = require("youtube-notification-module");
  client.Notifier = new ytnotifier({
    channels: [],
    checkInterval: 50 /* Interval to check the latest video. */,
  });

  client.Notifier.on("video", (video) => {
    console.log(video);
    /*
        video = {
            channelName,
            title,
            publishDate,
            url,
            id
        };
        */
  });
};
