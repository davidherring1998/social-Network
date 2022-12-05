const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  thoughtText: {
    type: String,
  },
  createdAt: Date,
});

const Thoughts = model("thoughts", userSchema);
module.exports = Thoughts;
