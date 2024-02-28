//Getting Enviroment Variables

require('dotenv').config();

//Setting up Express

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

//Using Mongoose for mongoDB

const db = require('./config/mongoose');

//Getting Passport

const passport = require('passport');
const passportLocal = require('./config/passport_local_strategy');

//Getting express session and connect mongo for storing sessions

const session = require('express-session');
const connectMongo = require('connect-mongo'); 

//Getting Flash

const flash = require('express-flash');

//Using urlEncoded to encode data

app.use(express.urlencoded());

//Setting up ejs layouts

const expressLayouts = require('express-ejs-layouts');

//Setting up static assets directory

app.use(express.static("./assets"));

//Setting up ejs and layouts for views

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(expressLayouts);
app.set('layout', './layouts/default');
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//Using express flash

app.use(flash());

//Using Express session with connect mongo

app.use(session({
    name: 'Employee Review System',
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: connectMongo.create({ mongoUrl: process.env.CONNECTMONGO_SESSION_LINK})
}));

//Using passport for Authentication

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


//Setting up routes

app.use('/', require('./routes/index'));

// Running the server

app.listen(port, function(err){
    (err) ? console.log("Error in running the server:", err) : console.log("Server is running on port:", port);
});