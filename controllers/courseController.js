const Course = require('../model/course');
const { findByIdAndUpdate } = require('../model/students');

module.exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json({ courses });
    }
    catch (error) {
        res.status(500).json({ 'message': error.message });
    }
}

module.exports.getCourseById = async (req, res) => {
    try {
        const id = req.params.id;
        const course = await Course.findById(id);
        console.log("course", course);
        if (!course) {
            res.status(404).json({ "message": 'Course not found!' });
        }
        else {
            res.status(200).json({ "course": course });
        }
    }
    catch (error) {
        res.status(500).json({ 'message': error.message });
    }
}

module.exports.createCourse = async (req, res) => {
    try {
        const { courseName, courseCode, description, department, semester } = req.body;
        if (!semester || !courseName || !courseCode || !description || !department) {
            return res.status(400).json({ 'message': 'Provide all inputs' });
        }

        const course = await Course.create({ courseName: courseName, courseCode: courseCode, department: department, description: description, semester: semester });
        res.status(200).json({ 'message': 'Course created', course });
    }
    catch (error) {
        res.status(500).json({ 'message': error.message });
    }
}

module.exports.updateCourse = async (req, res) => {
    try {
        const input = req.body;
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ 'message': 'provide id to update course' });
        }
        if (!input) {
            return res.status(404).json('Provide infomation to be updated');
        }

        const options = { new: true };
        const course = await Course.findByIdAndUpdate(id, input, options);
        res.status(200).json({ 'message': 'course updated', course });
    }
    catch (error) {
        res.status(500).json({ 'message': error.message });
    }
}

module.exports.deleteCourse = async (req, res) => {
    try {
        const id = req.params.id;
        const course = await Course.findByIdAndDelete(id);
        res.status(200).json({ 'message': `course with id: ${id} deleted` });
    }
    catch (error) {
        res.status(500).json({ 'message': error.message });
    }
}

