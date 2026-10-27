const router = require('express').Router();

const { getAllFaculty, getFacultyById, createFaculty, updateFaculty, deleteFaculty } = require('../controllers/facultyController');

router.get('/faculty', getAllFaculty);
router.get('/faculty/:id', getFacultyById);
router.post('/faculty', createFaculty);
router.put('/faculty/:id', updateFaculty);
router.delete('/faculty/:id', deleteFaculty);

module.exports = router;