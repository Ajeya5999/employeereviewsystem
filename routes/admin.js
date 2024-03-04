//Getting express router

const express = require("express");
const router = express.Router();

//Getting controllers

const dashboardController = require('../controllers/dashboard_controller');

// Setting Dashboard Routes

router.get('/employees', dashboardController.showEmployees); //Get Employee list

module.exports = router;