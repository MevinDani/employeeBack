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
