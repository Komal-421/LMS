const Course = require('../model/course');

module.exports.isUniqueCourse = async (req, res, next) => {
    try {
        const { courseCode } = req.body;
        const course = await Course.findOne({ courseCode });
        if (!course) {
            console.log("passed next");
            next();

        }
        else {
            return res.status(400).json({ 'message': 'Course already exist' });
        }
    }
    catch (error) {
        res.status(500).json({ 'message': error.message });

    }

}