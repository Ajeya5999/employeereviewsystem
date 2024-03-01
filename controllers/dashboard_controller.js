const User = require('../models/user'); //Getting user schema

module.exports.home = async function(req, res) {
    let authList = (req.user.user_type == "Admin") ? 
    await User.find({})
    .select('_id email')
    .exec() : 
    await User.findById(req.user._id)
    .select('auth_list').
    populate('auth_list', 'email')
    .exec();
    return res.render('home', {
        title: "Home",
        auth_users: authList
    });
};