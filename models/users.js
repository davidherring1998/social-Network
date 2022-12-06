const { Schema, model} = require('mongoose');

const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            trimmed: true,
            unique: true,
        },
        email: {
            type: String,
            required:true,
            trimmed: true,
            unique: true,
        },
        thoughts: {
            // array of _id
        },
        friends: {
            // array of _id
        },
    }
);

const User = model('user', userSchema);
module.exports = User;