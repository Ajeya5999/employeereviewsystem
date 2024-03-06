//Getting express router

const express = require("express");
const router = express.Router();

//Getting controllers

const dashboardController = require('../controllers/dashboard_controller');

// Setting Dashboard Routes

router.get('/employees', dashboardController.showEmployees); //Get Employee list
router.get('/curr_employee/:id', dashboardController.showCurrentEmployee); //Get Current Employee
router.post('/update_employee/:id', dashboardController.updateEmployee); //Update the Employee
router.post('/delete_employee/:id', dashboardController.deleteEmployee); //Delete the Employee
router.post('/add_to_list/:id', dashboardController.addToList); //Add Employees to Employee's Auth List
router.post('/remove_from_list/:id', dashboardController.removeFromList); //Remove Employees to Employee's Auth List

module.exports = router;