const Review = require('../models/review') //Getting reviews schema

module.exports.addReview = async function(req, res) {
    let {revieweeId, review} = req.body, reviewerId = req.user._id;
    if(revieweeId.equals(reviewerId)) {
        req.flash('error', "You cannnot enter your own review");
        return res.redirect('back');
    }
    try {
        await Review.updateOne({
            reviewer: reviewerId,
            reviewee: revieweeId
        }, {
            $set: {
                review: review
            }
        }, {
            upsert: true
        });
        req.flash('info',  "Review has been added");
        return res.redirect('back');
    } catch(err) {
        console.log('error', err);
        return res.redirect('/');
    }
}

module.exports.updateReview = async function(req, res) { //Update a selected interview
    let reviewId = req.params.id, review = req.body.review;
    try {
        await Review.findByIdAndUpdate(reviewId, {
            $set: {
                review: review              
            }
        });
        req.flash('info', 'Review has been updated');
        return res.redirect('back');
    } catch(err) {
        console.log('error', err);
        return res.redirect('/');
    }
}

module.exports.deleteReview = async function(req, res) { //Delete the selected review
    let reviewId = req.params.id;
    try {
        await Review.findByIdAndDelete(reviewId);
        req.flash('info', "Review has been deleted");
        return res.redirect('back');
    } catch(err) {
        console.log('error', err);
        return res.redirect('/');
    }
}