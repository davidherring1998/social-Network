const { Schema, model} = require('mongoose');

const userSchema = new Schema(
    {
        reactionId: {
        },
        reactionBody: {
            type: String,
            required:true,
        },
        thoughts: {
            type: String,
            required:true,
        },
        createdAt: {
            // set date to default value to current timestamp
        },
    }
);

const Reactions = model('user', userSchema);
module.exports = Reactions;