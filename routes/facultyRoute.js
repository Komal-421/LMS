const router = require('express').Router();

const { getAllFaculty, getFacultyById, createFaculty, updateFaculty, deleteFaculty } = require('../controllers/facultyController');
const { isUniqueFaculty } = require('../middleware/isUniqueFaculty');
const { allowRole } = require('../middleware/allowRole');
const { verifyToken } = require('../middleware/verifyToken');

router.get('/faculty', getAllFaculty);
router.get('/faculty/:id', getFacultyById);
router.post('/faculty', verifyToken, allowRole, isUniqueFaculty, createFaculty);
router.put('/faculty/:id', verifyToken, allowRole, updateFaculty);
router.delete('/faculty/:id', verifyToken, allowRole, deleteFaculty);

module.exports = router;