const { Schema, model } = require("mongoose");
const Reactions = require("./reactions");
const { schema } = require("./reactions");

const userSchema = new Schema({
  thoughtText: {
    type: String,
    required:true,
    minLength: 1,
    maxLength: 280,
  },
  createdAt: {
  type: Date,
  default: Date.now,
  // use getter method to format timestamp on query
  }
  },
  {
  username: {
    type: String,
    required: false,
  },
  }, 
  {
    reactions: [Reactions]
  }
);

const Thoughts = model("thoughts", userSchema);
module.exports = Thoughts;
