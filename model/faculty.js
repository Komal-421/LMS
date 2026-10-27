const mongoose = require('mongoose');
const student = require('./students');

const facultySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, unique: true, required: true, lowercase: true, trim: true },
    employeeId: {
        unique: true, required: true,
        type: String
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'student'                             // student must know there teacher id 
    },
    password: { unique: true, required: true, type: String },
    department: { type: String, required: true },
    experience: {
        type: Number, required: true, default: 0,
        validate: {
            validator: function (value) {
                return value >= 0
            },
            message: 'Enter valid experience years'
        }
    },
    role: {
        type: String, required: true,
        enum: ['null', 'faculty', 'admin'],
        default: 'faculty'
    }
}
)

module.exports = mongoose.model('faculty', facultySchema)