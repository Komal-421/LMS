const { request } = require("express");

module.exports.checkUpdates = (req, res, next) => {
    const obj = req.body;
    const input = Object.keys(obj)[0];
    if (input === 'name' || input === 'email' ||
        input === 'phone' || input === 'password' ||
        input === 'dob' || input === 'gender' ||
        input === 'address') {
        next();
    }

    if (input === 'role' || input === 'status' ||
        input === 'admissionDate' || input === 'department' ||
        input === 'enrollment_no')
        return res.status(403).json({ 'message': `Not allowed to update ${input} ` })
}