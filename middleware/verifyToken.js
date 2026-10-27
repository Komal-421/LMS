// const id = require('../controllers/authController');
const { authorizeRole } = require('../authHelper/auth');
const jwt = require('jsonwebtoken');

module.exports.verifyToken = async (req, res, next) => {
    const headers = req.headers;
    if (!headers) {
        return res.status(400).json('Token not found');
    }
    try {
        const token = headers.authorization.split(' ')[1];
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const role = authorizeRole(verified.role);
        if ((role === 0)) {
            return res.status(403).json({ 'message': "Student can't register themselves" })
        }
        if (!verified) {
            return res.status(400).json('Invalid token');
        }
        next();
    }
    catch (error) {
        return res.status(500).json({ 'message': error.message });
    }
}
