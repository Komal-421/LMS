const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id, role) => {
    const token = jwt.sign(
        { id, role },
        process.env.JWT_SECRET
    );
    return token;
}

const verifyPassword = async (stored, given) => {
    try {
        const verified = await bcrypt.compare(stored, given);
        return verified;
    }
    catch (error) {
        console.log(error.message);
    }
}

const authorizeRole = (role) => {
    if (role == "faculty" || role == 'admin') {
        return 1;               // 1 means return true
    }
    else if (role == 'student') {
        return 0;
    }
}

const createHash = async (password) => {
    const value = await bcrypt.hash(password, 10);
    return value;
}

const extractInfo = (req) => {
    const headers = req.headers;
    if (!headers) {
        return res.status(400).json('Token not found');
    }
    try {
        const token = headers.authorization.split(' ')[1];
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(verified);
        const role = verified.role;
        const id = verified.id;
        // console.log(id);
        return { id, role };
    }
    catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    generateToken, verifyPassword, authorizeRole, createHash, extractInfo
}