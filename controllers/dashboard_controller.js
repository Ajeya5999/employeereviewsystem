const User = require('../models/user'); //Getting user schema
const Review = require('../models/review'); //Getting review schema

module.exports.home = async function(req, res) { //Get thee home page to write reviews
    try {

        //Get all the reviews the current employee has written

        let reviewList = await Review.find({reviewer: req.user._id})
        .select('reviewee review')
        .exec(),
        
        //Get the list of list of employees authorised to the current employee for writing reviews
        
        authList = (req.user.user_type == "Admin") ? //If the employee is an admin 
        await User.find({})
        .select('_id email')
        .exec() : // Get all employees
        await User.findById(req.user._id)
        .select('auth_list').
        populate('auth_list', 'email')
        .exec(); // Get employees only from the authorised list

        //Revmove the logged in user from the list as a user should not be able to review themself

        let userIndex = authList.findIndex(employee => {return employee._id.equals(req.user._id);});
        if(userIndex !== -1) authList.splice(userIndex, 1);

        //Pair written reviews with the authorized list, returns blank string if no review was written

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

module.exports.updateEmployee = async function(req, res) { //Updating the selected employee
    let employeeId = req.params.id, {name, user_type} = req.body;
    try {
        let employee = await User.findById(employeeId)
        .select('name user_type')
        .exec();
        await User.findByIdAndUpdate(employeeId, {
            $set: {
                name: (name) ? name : employee.name,
                user_type: (user_type) ? user_type : employee.user_type
            }
        });
        req.flash('info', "Given employee has been updated");
        return res.redirect('back');
    } catch(err) {
        console.log('error', err);
        return res.redirect('/');
    }
}

module.exports.deleteEmployee = async function(req, res) { //Deleting the selected employee
    let employeeId = req.params.id;
    try {
        await Review.deleteMany({reviewee: employeeId});
        await User.findByIdAndDelete(employeeId);
        req.flash('info', "Employee has been removed");
        return res.redirect('/dashboard/admin/employees');
    } catch(err) {
        console.log("error", err);
        return res.redirect('/');
    }
}

module.exports.addToList = async function(req, res) { //Adding other emmployees to current employee's auth list
    let authList = req.body.auth_list, employeeId = req.params.id;
    try {
        let userType = await User.findById(employeeId)
        .select('user_type')
        .exec()
        .user_type;
        if(userType === "Admin")
            req.flash('error', "Cannot update authorization list for admins");
        else {
            await User.findByIdAndUpdate(employeeId, {
                $push: {
                    auth_list: {
                        $each: authList
                    }
                }
            });
            req.flash('info', "Employees have been added to authorization list");
        }
        return res.redirect('back');
    } catch(err) {
        console.log('error', err);
        return res.redirect('/');
    }
}