module.exports.allowRole = (req, res, next) => {
    console.log("Role in allow role=> ", req.role);
    const role = req.role;
    const method = req.method;
    if (method !== 'DELETE') {
        if (role === 'faculty' || role === 'admin')
            next();
        if (role === 'student')
            return res.status(403).json({ 'message': 'Students are not allowed to access protected route!' });
    }

    if (method === 'DELETE') {
        if (role === 'admin')
            next();
        if (role === 'student' || role === 'faculty')
            return res.status(403).json({ 'message': 'Cannot access protected route!' });
    }
}