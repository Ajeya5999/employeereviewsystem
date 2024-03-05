const User = require('../models/user'); //Getting user schema
const Review = require('../models/review'); //Getting review schema
const user = require('../models/user');

module.exports.home = async function(req, res) {
    try {
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
        let userIndex = authList.findIndex(employee => {return employee._id.equals(req.user._id);});
        if(userIndex !== -1) authList.splice(userIndex, 1);
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
    } catch(err) {
        console.log('error', err);
        return res.redirect('/');
    }
};

module.exports.showEmployees = async function(req, res) {
    try {
        let employees = await User.find({})
        .select('_id name email user_type auth_list')
        .populate('auth_list', 'name email')
        .exec();
        return res.render('employees', {
            title: "Employees",
            employee_list: employees
        });
    } catch(err) {
        console.log('error', err);
        return res.redirect('/');
    }
}

module.exports.showCurrentEmployee = async function(req, res) {
    let employeeId = req.params.id;
    try {
        let currEmployee = await User.findById(employeeId)
        .select('_id name email user_type auth_list')
        .exec();
        let employeesList = await User.find({})
        .select('_id name email')
        .exec(); 
        employeesList.splice(
            employeesList.findIndex(
                employee => {return employee._id.equals(employeeId);}
            ), 1
        );
        let authList = [], nonAuthList = [];
        if(currEmployee.user_type === "Admin") 
            authList = employeesList;
        else {
            authList = currEmployee.auth_list;
            for(employee of employeesList) {
                let userIndex = authList.findIndex(user => {return user._id.equals(employee._id);});
                if(userIndex === -1) nonAuthList.push(employee);
            }
        }
        return res.render('curr_employee', {
            title: "Currenr Employee",
            employee: currEmployee,
            auth_list: authList,
            non_auth_list: nonAuthList
        });
    } catch(err) {
        console.log('error', err);
        return res.redirect('/');
    }
}