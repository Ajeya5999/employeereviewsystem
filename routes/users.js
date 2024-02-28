//Getting express router

const express = require("express");
const router = express.Router();

//Getting Passport

const passport = require('passport');

//Getting controllers

const usersController = require('../controllers/users_controller');

// Setting User Routes

router.get('/sign-up', usersController.signUp); // Load Sign-up Page
router.post('/create', usersController.create); // Make user account
router.get('/sign-in', usersController.signIn); // Load Sign-in Page
router.post('/create_session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in',
     failureFlash: true}
), usersController.createSession); // For Signing into the weebsite
router.get('/sign-out', usersController.destroySession); // For signing out

module.exports = router;