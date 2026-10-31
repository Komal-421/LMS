const router = require('express').Router();

const { getAllStudents, getStudentById, updateStudent, deleteStudent } = require('../controllers/studentController');
const { allowRole } = require('../middleware/allowRole');
const { verifyToken } = require('../middleware/verifyToken');
const { checkUpdates } = require('../middleware/checkUpdates');

router.get('/students', getAllStudents);
router.get('/students/:id', getStudentById);
router.put('/students/:id', checkUpdates, updateStudent);
router.delete('/students/:id', verifyToken, allowRole, deleteStudent);

module.exports = router;