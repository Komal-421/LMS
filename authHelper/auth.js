const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports.generateToken = (id, role) => {
    const token = jwt.sign(
        { id: id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' },
        { role: role }
    );
    return token;
}

module.exports.verifyPassword = (stored, given) => {
    try {
        const verified = bcrypt.compare(stored, given);
        return verified;
    }
    catch (error) {
        console.log(error.message);
    }
}

module.exports.authorizeRole = (role) => {
    console.log("Role in authorizeRole: ", role);
    if (role == "faculty" || role == 'admin') {
        return 1;               // 1 means return true
    }
    else if (role == 'student') {
        return 0;
    }
}

module.exports.createHash = async (password) => {
    return await bcrypt.hash(password, 10);
}

module.exports.extractInfo = (req, res) => {
    const headers = req.headers;
    if (!headers) {
        return res.status(400).json('Token not found');
    }
    try {
        const token = headers.authorization.split(' ')[1];
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const role = authorizeRole(verified.role);
        const id = verified.id;
        return { role, id };
    }
    catch (error) {
        console.log(error.message);
    }
}