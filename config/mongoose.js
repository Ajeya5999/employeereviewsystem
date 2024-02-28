// Getting Database connection from enviroment

require('dotenv').config();

//Setting up mongoose

const mongoose = require('mongoose');

// Connecting to Database

mongoose.connect(process.env.MONGODB_LINK);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to mongoDB"));

db.once('open', function(){
    console.log("Connected to Database");
});

module.exports = db;