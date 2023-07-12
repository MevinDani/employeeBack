const mongoose = require('mongoose')
const validator = require('validator')

const employeesSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        validator(value) {
            if (!validator.isEmail(value)) {
                throw Error("Invalid Email")
            }
        }
    },
    mobile: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 13
    },
    gender: {
        type: String,
        trim: true,
        required: true
    },
    status: {
        type: String,
        trim: true,
        required: true
    },
    profile: {
        type: String,
        trim: true,
        required: true
    },
    location: {
        type: String,
        trim: true,
        required: true
    },
})

module.exports = mongoose.model('Employee', employeesSchema)