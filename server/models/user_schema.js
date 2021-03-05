const mongoose = require("mongoose");

const schema = mongoose.Schema({
  username: String,
  password: String,
  created: { type: Date, default: Date.now },
});

schema.index({ username: 1 }, { unique: true });
module.exports = mongoose.model("users", schema);
