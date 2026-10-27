const Student = require('../model/students');

module.exports.getAllStudents = async (req, res) => {
    try {

        const students = await Student.find();
        res.status(200).json(students);
    }
    catch (error) {
        res.status(500).json({ 'message': message.error });
    }
}

module.exports.getStudentById = async (req, res) => {
    try {
        const id = await Student.findOne({ email });
        const student = await Student.findById(id);
        res.status(200).json(student);
    }
    catch (error) {
        res.status(500).json({ 'message': message.error });
    }
}

module.exports.updateStudent = async (req, res) => {
    const id = req.params.id;
    const { input } = req.body;
    if (!id) {
        return res.status(400).json({ 'message': 'provide id to update student' });
    }
    if (!input) {
        return res.status(404).json('Provide infomation to be updated');
    }
    try {
        const options = { new: true };
        const updated = { id, input, options };
        return res.status(200).json({ 'message': 'Student updated', updated });
    }
    catch (error) {
        res.status(500).json({ 'message': message.error });
    }
}

module.exports.deleteStudent = async (req, res) => {
    try {
        const id = await Student.findOne({ email });
        const student = await Student.findByIdAndDelete(id);
        res.status(200).json({ 'message': `Student with id: ${id} deleted` });
    }
    catch (error) {
        res.status(500).json({ 'message': message.error });
    }
}

