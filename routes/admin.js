//Getting express router

const express = require("express");
const router = express.Router();

//Getting controllers

const dashboardController = require('../controllers/dashboard_controller');

// Setting Dashboard Routes

router.get('/employees', dashboardController.showEmployees); //Get Employee list
router.get('/curr_employee/:id', dashboardController.showCurrentEmployee); //Get Current Employee
router.post('/update_employee/:id', dashboardController.updateEmployee); //Update the employee

module.exports = router;