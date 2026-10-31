const Student = require('../model/students');

module.exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json({ students });
    }
    catch (error) {
        res.status(500).json({ 'message': message.error });
    }
}

module.exports.getStudentById = async (id, res, req, res_own) => {
    try {
        if (id) {
            const student = await Student.findById(id);
            res.status(200).json(student);
        }
        if (!id) {
            const id = req.params.id;
            const student = await Student.findById(id);
            res_own.status(200).json(student);
        }
    }
    catch (error) {
        res.status(500).json({ 'message': error.message });
    }
}

module.exports.updateStudent = async (req, res) => {
    try {
        const id = req.params.id;
        const input = req.body;
        if (!id) {
            return res.status(400).json({ 'message': 'provide id to update student' });
        }
        if (!input) {
            return res.status(404).json({ 'message': 'Provide infomation to be updated' });
        }

        const options = { new: true };
        const user = await Student.findByIdAndUpdate(id, input, options);
        return res.status(200).json({ 'message': 'Student updated', user });
    }
    catch (error) {
        res.status(500).json({ 'message': error.message });
    }
}

module.exports.deleteStudent = async (req, res) => {
    try {
        const id = req.params.id;
        const student = await Student.findByIdAndDelete(id);
        res.status(200).json({ 'message': `Student with id: ${id} deleted` });
    }
    catch (error) {
        res.status(500).json({ 'message': error.message });
    }
}

