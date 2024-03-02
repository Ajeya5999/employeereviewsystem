const User = require('../models/user'); //Getting user schema
const Review = require('../models/review'); //Getting review schema

module.exports.home = async function(req, res) {
    let reviewList = await Review.find({reviewer: req.user._id})
    .select('reviewee review')
    .exec(), 
    authList = (req.user.user_type == "Admin") ? 
    await User.find({})
    .select('_id email')
    .exec() : 
    await User.findById(req.user._id)
    .select('auth_list').
    populate('auth_list', 'email')
    .exec();
    for(let iterator1 = 0; iterator1 < authList.length; iterator1++) {
        let currReview = "";
        for(let iterator2 = 0; iterator2 < reviewList.length; iterator2++) {
            if(authList[iterator1]._id.equals(reviewList[iterator2].reviewee)) {
                currReview = reviewList[iterator2].review;
                break;
            }
        }
        var newObject = {
            _id: authList[iterator1]._id,
            email: authList[iterator1].email,
            review: currReview
        }
        authList[iterator1] = newObject; 
    }
    return res.render('home', {
        title: "Home",
        auth_users: authList
    });
};