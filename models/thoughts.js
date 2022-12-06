const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  thoughtText: {
    type: String,
    required:true
  },
  createdAt: Date,
  },
  {
  username: {
    type: String,
    required: false,
  },
  }, 
  {
    reactions: {
      // array of nested docs created with reaction schema..
    }
  }
);

const Thoughts = model("thoughts", userSchema);
module.exports = Thoughts;
