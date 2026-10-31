const Faculty = require('../model/faculty');

module.exports.isUniqueFaculty = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await Faculty.findOne({ email });
        if (!user) {
            console.log("Checked unique faculty");
            next();
        }
        else if (user) {
            return res.status(400).json({ 'message': 'Faculty already registered' });
        }
    }
    catch (error) {
        res.status(500).json({ 'message': error.message });
    }
}