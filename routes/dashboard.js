//Getting express router

const express = require("express");
const router = express.Router();

//Getting controllers

const dashboardController = require('../controllers/dashboard_controller');

// Setting Dashboard Routes

router.get('/job_listings', dashboardController.listinngs); //Get Job Listings page
router.use('/admin', require('./admin')); //Routes for admins

module.exports = router;