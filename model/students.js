const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, unique: true, required: true, lowercase: true },
    phone: {
        type: Number, unique: true, required: true,
        validate: {
            validator: function (value) {
                return String(value).length === 10;
            },
            message: 'Enter valid phone number'
        }
    },
    password: { required: true, select: false, type: String },
    dob: {
        type: Date, required: true,
        validate: {
            validator: function (value) {
                return value < new Date();
            },
            message: 'Enter correct DOB'
        }
    },
    gender: {
        type: String, required: true,
        enum: ['Male', 'Female', 'Others', 'Prefer not to say'],
        default: 'Male'
    },
    address: { type: String, required: true },
    enrollment_no: { type: Number, required: true, unique: true },
    department: { type: String, required: true },
    admissionDate: {
        type: String, required: true,
        validate: {
            validator: function (value) {
                return new Date(value) <= new Date();
            },
            message: 'Enter valid admission date'
        }
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'passed out', 'dropped'],
        default: 'active'
    },
    role: {
        type: String, required: true,
        enum: ['null', 'student'],
        default: 'student'
    }
})

module.exports = mongoose.model('student', studentSchema);