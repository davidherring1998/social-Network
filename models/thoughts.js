const { Schema, model } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionId: {},
    reactionBody: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    userName: {
      type: String,
      // required:true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    // required: true,
  },
  reactions: [reactionSchema],
});

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thoughts = model("thoughts", thoughtSchema);
module.exports = Thoughts;
