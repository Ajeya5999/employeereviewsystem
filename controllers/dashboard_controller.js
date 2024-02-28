module.exports.listinngs = async function(req, res) {
    return res.render('job_listings', {
        title: "Job Listings"
    });
};