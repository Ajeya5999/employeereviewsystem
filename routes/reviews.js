//Getting express router

const express = require("express");
const router = express.Router();

//Getting controllers

const reviewsController = require('../controllers/reviews_controller');

// Setting Dashboard Routes

router.post('/add-review', reviewsController.addReview); //Add the review

module.exports = router;