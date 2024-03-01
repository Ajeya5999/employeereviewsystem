const mongoose = require('mongoose');

//Review Schema

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: true
    },
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reviewee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

reviewSchema.index({
    reviewer: 1,
    reviewee: 1
}, {unique: true});

//Compiling the Schema into a Model

const review = mongoose.model('Review', reviewSchema);

module.exports = review;