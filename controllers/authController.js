const Student = require('../model/students');
const Faculty = require('../model/faculty');
const getFacultyById = require('../controllers/facultyController');
const getStudentById = require('../controllers/studentController');
const bcrypt = require('bcryptjs');
const { generateToken, verifyPassword, createHash, authorizeRole, extractInfo } = require('../authHelper/auth');

module.exports.registerStudent = async (req, res) => {
    try {
        const { name, email, password, gender, phone, dob, address, enrollment_no, department, admissionDate } = req.body;
        const hashed = createHash(password);
        const user = await Student.create({ name: name, email: email, phone: phone, password: hashed, dob: dob, gender: gender, address: address, enrollment_no: enrollment_no, department: department, admissionDate: admissionDate, status: 'active', role: 'student' });
        res.status(200).json({ 'message': 'student created', user });
    }
    catch (error) {
        res.status(500).json({ 'message': error.message });
    }
}

module.exports.loginUser = async (req, res) => {
    const { email, password, role } = req.body;

    if (!email || !password) {
        return res.status(400).json({ 'message': 'Email or password not provided!' });
    }
    try {
        if (role == 'faculty') {
            var user = await Faculty.findOne({ email });
        }
        else if (role == 'student') {
            var user = await Student.findOne({ email });
        }

        const verified = verifyPassword(user.password, password);
        const ok = user && verified;
        if (!ok) {
            return res.status(400).json({ 'message': 'Invalid email or password' });
        }

        const token = generateToken(user._id, user.role);
        // res.send('token', token, {
        //     httpOnly: true,
        //     maxAge: 3600000
        // })
        res.status(200).json({ 'token': token, 'email': user.email });
    }
    catch (error) {
        res.status(500).json({ 'message': error.message });
    }

}

module.exports.getCurrentUser = async (req, res) => {
    const { role, id } = extractInfo(req);

    if (!role) {
        return res.status(404).json({ 'message': 'cannot find role' });
    }
    if (!id) {
        return res.status(404).json({ 'message': 'cannot find id' });
    }
    try {
        const role = authorizeRole(role);
        if (role == 1) {
            getFacultyById(id);
        }
        else if (role == 0) {
            getStudentById(id);
        }
    }
    catch (error) {
        res.status(500).json({ 'message': error.message });
    }
}

module.exports.updateCurrentUser = async (req, res) => {
    const { info, role, id } = req.body;
    if (!role) {
        return res.status(404).json({ 'message': 'role not defined' });
    }
    else if (!info) {
        return res.status(404).json({ 'message': 'provide info to be updated' });
    }
    else if (!id) {
        return res.status(404).json({ 'message': 'id not provided' });
    }
    try {
        const options = { new: true };
        if (role == 'student') {
            const updated = await Student.findByIdAndUpdate(id, info, options);
            return res.status(200).json({ 'message': 'updated student', updated });

        }
        else if (role == 'faculty') {
            const updated = await Faculty.findByIdAndUpdate(id, info, options);
            return res.status(200).json({ 'message': 'updated student', updated });
        }
    }
    catch (error) {
        res.status(500).json({ 'message': error.message });
    }
}

