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
            match: /.+\@.+\..+/,
        },
        thoughts: {
            // Array of _id values referencing the Thought mod
        },
        friends: {
            // Array of _id values referencing the User model (self-reference)
        },
    }
);

const User = model('user', userSchema);
module.exports = User;