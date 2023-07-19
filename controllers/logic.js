const Employee = require("../models/emsSchema");


// logic to register new employee
exports.employeeRegister = async (req, res) => {
    const file = req.file.filename
    const { firstName, lastName, email,
        mobile, gender, employeeStatus, location } = req.body
    if (!firstName || !lastName || !email || !mobile || !gender || !employeeStatus || !location || !file) {
        // console.log(req.body, file, "missing?");
        return res.status(403).json("All inputs are required")
        // console.log("what?");
    }

    try {
        const preEmployee = await Employee.findOne({ email })
        if (preEmployee) {
            res.status(403).json("Employee already exists")
            // console.log(preEmployee, "Employee already exists");
        } else {
            // console.log('noEmp');
            const newEmployee = new Employee({
                firstName, lastName, email,
                mobile, gender, status: employeeStatus, location, profile: file
            })
            // console.log(newEmployee, "after new employee");

            await newEmployee.save()
                .then(() => {
                    res.status(200).json({
                        message: "Employee added successfully",
                        result: newEmployee
                    })
                })
                .catch((error) => {
                    console.error('Error creating employee:', error);
                });
        }
    } catch (error) {
        // console.log('catch');
        res.status(500).json(error)
    }
}

// get all employee data
exports.getAllEmpData = async (req, res) => {
    // access query params for req
    const fname = req.query.search
    const query = {
        firstName: { $regex: fname, $options: "i" }
    }
    try {
        const empData = await Employee.find(query)
            .then((empData) => {
                res.status(200).json(
                    empData
                )
            })
    } catch (error) {
        res.status(500).json(error)
    }
}

// get user based on id
exports.getUserById = async (req, res) => {
    const { userId } = req.params
    try {
        const userData = await Employee.findById(userId)
            .then((userData) => {
                res.status(200).json(userData)
            })
    } catch (error) {
        res.status(500).json(error)
    }
}

// deleteUser
exports.deleteUserById = async (req, res) => {
    const { userId } = req.params
    try {
        const removedItem = await Employee.findByIdAndDelete({ _id: userId })
        res.status(201).json({
            data: removedItem,
            message: "user deleted"
        })
    } catch (error) {
        res.status(500).json(error)
    }
}
