const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports.signUp = function(req, res) { //for rendering signup page
    return res.render('sign_up', {
        title: 'Sign Up',
        layout: './layouts/auth'
    });
}

module.exports.create = async function(req, res) { //for creating an employee account
    let {name, email, password, confirm_password} = req.body;
    if(password != confirm_password) {
        req.flash('error', "The password is not confirmed");
        return res.redirect('back');
    }
    try {
        let user = await User.findOne({email: email});
        if(!user) {
            let hashPassword = await bcrypt.hash(password, 10);
            await User.create({
                name: name,
                email: email,
                password: hashPassword,
                user_type: "Employee"
            });
            return res.redirect('/users/sign-in');
        }
        else {
            req.flash('error', "User already exists!");
            return res.redirect('back');
        }
    } catch(err) {
        console.log("error", err);
        return res.redirect('/');
    }
}

module.exports.signIn = function(req, res) { //for rendering sign in page
    if(!req.user) {
        return res.render('sign_in', {
            title: 'Sign In',
            layout: './layouts/auth'
        });
    }
    return res.redirect('/dashboard/home');
}

module.exports.createSession = function(req, res){  //for signing in to the web app
    req.flash('info', "logged in");
    return res.redirect('/dashboard/home');
};

module.exports.destroySession = function(req, res){ //for loging out the created session
    req.logout(function(err){
        if (err) { 
            console.log(err);
            return;
        }
        req.flash('info', 'You have been logged out');
        return res.redirect('/users/sign-in');
    })
};