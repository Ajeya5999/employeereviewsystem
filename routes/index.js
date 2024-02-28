//Getting express router

const express = require("express");
const router = express.Router();

//Getting Passport

const passport = require('passport');

//Getting controllers

const homeController = require('../controllers/home_controller');

console.log("Router has been loaded");

router.get('/', homeController.home); //Index / Entry Page
router.use('/dashboard', passport.checkAuthentication, require('./dashboard')); //Routes for Dashboard
router.use('/users', require('./users'));  //Routes for employees and admins
// router.all('*', homeController.notFound); //For Non Existant Routes  

module.exports = router;