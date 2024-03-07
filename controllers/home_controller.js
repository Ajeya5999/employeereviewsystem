module.exports.home = function(req, res) {
    res.redirect('/dashboard/home');
};

module.exports.notFound = function(req, res) {
    res.render('not_found', {
        title: 'Not Found',
        layout: './layouts/auth',
    })
}