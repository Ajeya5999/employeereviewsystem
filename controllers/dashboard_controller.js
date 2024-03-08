const User = require('../models/user'); //Getting user schema
const Review = require('../models/review'); //Getting review schema

module.exports.home = async function(req, res) { //Get thee home page to write reviews
    try {
        
        //Get the list of list of employees authorised to the current employee for writing reviews
        
        let authList = (req.user.user_type == "Admin") ? //If the employee is an admin 
        await User.find({})
        .select('_id email')
        .exec() : // Get all employees
        await User.findById(req.user._id)
        .select('auth_list').
        populate('auth_list', 'email')
        .exec(); // Get employees only from the authorised list

        //Revmove the logged in user from the list as a user should not be able to review themself

        if(authList.length) {
            let userIndex = authList.findIndex(employee => {return employee._id.equals(req.user._id);});
            if(userIndex !== -1) authList.splice(userIndex, 1);
        }
        
        //Render the page

        return res.render('home', {
            title: "Home",
            auth_users: authList
        });

    } catch(err) {
        console.log('error', err);
        return res.redirect('/');
    }
};

module.exports.showEmployees = async function(req, res) { //Show the list of employees
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

module.exports.showCurrentEmployee = async function(req, res) { //Show the selected employuee detials
    let employeeId = req.params.id;
    try {

        //Get the employee who needs to be edited

        let currEmployee = await User.findById(employeeId)
        .select('_id name email user_type auth_list')
        .populate('auth_list', 'name email')
        .exec(),


        //Get the list of all employees

        employeesList = await User.find({})
        .select('_id name email')
        .exec(); 

        //An employee cannot review themself and hence should not be authorised to do so

        employeesList.splice(
            employeesList.findIndex(
                employee => {return employee._id.equals(employeeId);}
            ), 1
        );

        //Getting the list of authorised and non authorised employees

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

        //Render the page

        return res.render('curr_employee', {
            title: "Current Employee",
            employee: currEmployee,
            auth_list: authList,
            non_auth_list: nonAuthList
        });

    } catch(err) {
        console.log('error', err);
        return res.redirect('/');
    }
}

module.exports.showReviews = async function(req, res) { //Get the list of reviews
    try {
        let reviews = await Review.find({})
        .populate('reviewer', '_id name email')
        .populate('reviewee', '_id name email')
        .exec();
        return res.render('reviews', {
            title: 'Reviews',
            review_list: reviews
        });
    } catch(err) {
        console.log('error', err);
        return res.redirect('/');
    }
}