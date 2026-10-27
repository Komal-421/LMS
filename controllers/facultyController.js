const Faculty = require('../model/faculty');
const bcrypt = require('bcryptjs');

module.exports.getAllFaculty = async (req, res) => {
    try {
        const faculties = await Faculty.find();
        res.status(200).json(faculties);
    }
    catch (error) {
        res.status(500).json({ 'message': message.error });
    }
}

module.exports.getFacultyById = async (req, res) => {
    try {
        const id = await Faculty.findOne({ email });
        const faculty = await Faculty.findById(id);
        res.status(200).json(faculty);
    }
    catch (error) {
        res.status(500).json({ 'message': message.error });
    }
}

module.exports.updateFaculty = async (req, res) => {
    const { input, id } = req.body;
    if (!id) {
        return res.status(400).json({ 'message': 'provide id to update faculty' });
    }
    if (!input) {
        return res.status(404).json('Provide infomation to be updated');
    }

    try {
        const options = { new: true };
        const updated_user = await Faculty.findByIdAndUpdate(id, input, options);
        return res.status(200).json({ 'message': 'Faculty updated', updated_user });
    }
    catch (error) {
        res.status(500).json({ 'message': message.error });
    }
}

module.exports.createFaculty = async (req, res) => {
    const { name, email, employeeId, password, experience, department } = req.body;
    if (!email || !password || !employeeId || !name || !department || !experience) {
        return res.status(400).json({ 'message': 'Provide all inputs!' });
    }
    try {
        const { email, name, password, experience, employeeId, department } = req.body;
        const hashed = await bcrypt.hash(password, 10);
        const user = await Faculty.create({ name: name, email: email, department: department, employeeId: employeeId, password: hashed, experience: experience, role: 'faculty' });
        res.status(200).json({ 'message': 'Faculty created', user });
    }
    catch (error) {
        res.status(500).json({ 'message': error.message });
    }
}

module.exports.deleteFaculty = async (req, res) => {
    try {
        const id = await Faculty.findOne({ email });
        const faculty = await Faculty.findByIdAndDelete(id);
        res.status(200).json({ 'message': `Faculty with id: ${id} deleted` });
    }
    catch (error) {
        res.status(500).json({ 'message': message.error });
    }
}

