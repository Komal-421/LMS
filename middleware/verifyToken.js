const jwt = require('jsonwebtoken');

module.exports.verifyToken = async (req, res, next) => {
    const headers = req.headers;
    if (!headers) {
        return res.status(400).json('Token not found');
    }
    try {
        const token = headers.authorization.split(' ')[1];
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        if (!verified) {
            return res.status(400).json('Invalid token');
        }

        else {
            req.id = verified.id;
            req.role = verified.role;
            next();
        }
    }
    catch (error) {
        return res.status(500).json({ 'message': error.message });
    }
}
