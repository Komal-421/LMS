
module.exports.checkUpdates = (req, res, next) => {
    const obj = req.body;
    const input = Object.keys(obj)[0];
    const role = req.role;
    if ((role === 'student' || role === 'admin' && role == !'faculty') && (input === 'name' || input === 'email' ||
        input === 'phone' || input === 'password' ||
        input === 'dob' ||
        input === 'address')) {
        next();
    }

    if (role == 'student' && (input === 'role' || input === 'status' ||
        input === 'admissionDate' || input === 'department' ||
        input === 'enrollment_no' || input === 'gender'))
        return res.status(403).json({ 'message': `Not allowed to update ${input} ` });

    if (role === 'faculty' && (input === 'role' || input === 'status' ||
        input === 'admissionDate' || input === 'department' ||
        input === 'enrollment_no')) {
        next();
    }
}