//Getting express router

const express = require("express");
const router = express.Router();

//Getting controllers

const dashboardController = require('../controllers/dashboard_controller'); //Dashboard controller
const employeesController = require('../controllers/employees_controller'); //Employeees controller
const reviewsController = require('../controllers/reviews_controller'); //Reviews controller

// Setting Dashboard Routes

router.get('/employees', dashboardController.showEmployees); //Get Employee list
router.get('/curr_employee/:id', dashboardController.showCurrentEmployee); //Get Current Employee
router.post('/update_employee/:id', employeesController.updateEmployee); //Update the Employee
router.post('/delete_employee/:id', employeesController.deleteEmployee); //Delete the Employee
router.post('/add_to_list/:id', employeesController.addToList); //Add Employees to Employee's Auth List
router.post('/remove_from_list/:id', employeesController.removeFromList); //Remove Employees to Employee's Auth List
router.get('/reviews', dashboardController.showReviews); //Get review list
router.post('/update_review/:id', reviewsController.updateReview); //Update review
router.post('/delete_review/:id', reviewsController.deleteReview) //Delete review

module.exports = router;