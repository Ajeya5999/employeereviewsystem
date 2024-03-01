//Getting express router

const express = require("express");
const router = express.Router();

//Getting controllers

const dashboardController = require('../controllers/dashboard_controller');
const customMiddlewares = require('../config/custom_middlewares');

// Setting Dashboard Routes

router.get('/home', dashboardController.home); //Get Job Listings page
router.use('/admin', customMiddlewares.checkAdmin, require('./admin')); //Routes for admins

module.exports = router;