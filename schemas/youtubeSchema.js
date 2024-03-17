const { model, Schema } = require("mongoose");

let youtubeSchema = new Schema({
  GuildID: String,
  ChannelID: Number,
  User: String,
});
module.exports = model("Youtube", youtubeSchema);
