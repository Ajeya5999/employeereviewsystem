//Getting express router

const express = require("express");
const router = express.Router();

//Getting controllers

const dashboardController = require('../controllers/dashboard_controller');

// Setting Dashboard Routes

router.get('/employees', dashboardController.showEmployees); //Get Employee list
router.get('/curr_employee/:id', dashboardController.showCurrentEmployee); //Get Current Employee

module.exports = router;