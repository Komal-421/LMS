const router = require('express').Router();
const { verifyToken } = require('../middleware/verifyToken');
const { registerStudent, loginUser, getCurrentUser, updateCurrentUser } = require('../controllers/authController');
// const generateToken = require('../middleware/generateToken');

router.post('/auth/register', verifyToken, registerStudent);
router.post('/auth/login', loginUser);
router.get('/auth/me', verifyToken, getCurrentUser);
router.put('/auth/me', verifyToken, updateCurrentUser);

module.exports = router;