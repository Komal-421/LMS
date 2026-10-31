const Student = require('../model/students');

module.exports.isUniqueStudent = async (req, res, next) => {
    try {
    const { email } = req.body;
    const user = await Student.findOne({ email });
    if (!user) {
        next();
    }
    else {
        return res.status(400).json({ 'message': 'Student already registered' });
    }
    }
    catch (error) {
        res.status(500).json({ 'message': error.message });

    }

}