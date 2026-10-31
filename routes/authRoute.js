const router = require('express').Router();
const { verifyToken } = require('../middleware/verifyToken');
const { registerStudent, loginUser, getCurrentUser } = require('../controllers/authController');
const { isUniqueStudent } = require('../middleware/isUniqueStudent');
// const generateToken = require('../middleware/generateToken');

router.post('/auth/register', verifyToken, isUniqueStudent, registerStudent);
router.post('/auth/login', loginUser);
router.get('/auth/me', getCurrentUser);
// router.put('/auth/me', verifyToken, updateCurrentUser);

module.exports = router;