const { model, Schema } = require("mongoose");

let birthdaySchema = new Schema({
  GuildID: String,
  ChannelID: String,
  User: String,
  Day: Number,
  Month: String,
  Year: Number,
});
module.exports = model("Birthday", birthdaySchema);
