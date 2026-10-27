const Course = require('../model/course');

module.exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    }
    catch (error) {
        res.status(500).json({ 'message': message.error });
    }
}

module.exports.getCourseById = async (req, res) => {
    try {
        const id = await Course.findOne({ email });
        const course = await Course.findById(id);
        res.status(200).json(course);
    }
    catch (error) {
        res.status(500).json({ 'message': message.error });
    }
}

module.exports.createCourse = async (req, res) => {
    const { courseName, courseCode, description, department, semester } = req.body;
    if (!semester || !courseName || !courseCode || !description || !department) {
        return res.status(404).json('Provide all inputs');
    }
    try {
        const course = await Course.create({ courseName: courseName, courseCode: courseCode, description: description, semester: semester });
        res.status(200).json({ 'message': 'Course created', course });
    }
    catch (error) {
        res.status(500).json({ 'message': message.error });
    }
}

module.exports.updateCourse = async (req, res) => {
    const { input } = req.body;
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ 'message': 'provide id to update course' });
    }
    if (!input) {
        return res.status(404).json('Provide infomation to be updated');
    }
    try {
        const options = { new: true };
        const updated = { id, input, options };
        res.status(200).json({ 'message': 'course updated', updated });
    }
    catch (error) {
        res.status(500).json({ 'message': message.error });
    }
}

module.exports.deleteCourse = async (req, res) => {
    try {
        const id = await Course.findOne({ email });
        const course = await Course.findByIdAndDelete(id);
        res.status(200).json({ 'message': `course with id: ${id} deleted` });
    }
    catch (error) {
        res.status(500).json({ 'message': message.error });
    }
}

