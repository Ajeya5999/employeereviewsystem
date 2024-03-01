module.exports.checkAdmin = function(req, res, next) {
    if(req.user.user_type == "Admin") return next();
    req.flash("error", "You do not have admin access");
    return res.redirect('/dashboard/home');
}