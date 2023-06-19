const { model, Schema } = require("mongoose");

let youtubeSchema = new Schema({
  ID: String,
  Channel: String,
});

module.exports = model("Youtube", youtubeSchema);
