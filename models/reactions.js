const { Schema, model} = require('mongoose');
const objectId = Schema.ObjectId 

const userSchema = new Schema(
    {
        reactionId: {
            objectId
        },
        reactionBody: {
            type: String,
            required:true,
            minLength: 1,
            maxLength: 280,
        },
        thoughts: {
            type: String,
            required:true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // Use a getter method to format the timestamp on query
        },
    }
);

const Reactions = model('reactions', userSchema);
module.exports = Reactions;