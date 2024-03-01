const Review = require('../models/review') //Getting reviews schema

module.exports.addReview = async function(req, res) {
    let {revieweeId, review} = req.body, reviewerId = req.user._id;
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