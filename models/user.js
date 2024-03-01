const mongoose = require('mongoose');

//User Schema

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        required: true
    },
    auth_list: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    }
}, {
    timestamps: true
});

//Compiling the Schema into a Model

const user = mongoose.model('User', userSchema);

module.exports = user;