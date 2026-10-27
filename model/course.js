const mongoose = require('mongoose');
const student = require('./students');
const faculty = require('./faculty');

const courseSchema = new mongoose.Schema({
    courseName: { type: String, required: true, trim: true },
    courseCode: {
        type: mongoose.Schema.Types.ObjectId, required: true, unique: true,
        ref: ['student', 'faculty']
    },     //student must know course code and teacher also, who will teach the course 
    description: { type: String, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'faculty' }, //every faculty must know what department he is in
    semester: { type: Number, required: true }
})

module.exports = mongoose.model('course', courseSchema);