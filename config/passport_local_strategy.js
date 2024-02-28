const passport = require('passport'); // Getting Passport
const localStrategy = require('passport-local').Strategy; // Using Passport Local Strategy
const User = require('../models/user'); // Getting User model
const bcrypt = require('bcrypt'); // Getting bcrypt

const checkUser = async function(req, email, password, done) { // function to check if user exists
    let user;
    try {
        user = await User.findOne({email: email});
        if(!user || !await bcrypt.compare(password, user.password)) return done(null, false, { message: "invalid Username / Password"});
        return done(null, user);
    } catch(err){
        return done(err);
    }
};

// Setting up passport

passport.use(new localStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, checkUser));

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser( async function(id, done){
    let user;
    try{
        user = await User.findById(id);
    } catch(err){
        console.log("Error in finding user --> Passport");
        return done(err);
    }
    return done(null, user);
});

//check if user is authenticated

passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');
};

//set user in local session for rendering

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
};

module.exports = passport;