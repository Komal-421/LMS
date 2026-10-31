const router = require('express').Router();

const { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse } = require('../controllers/courseController');
const { isUniqueCourse } = require('../middleware/isUniqueCourse');
const { allowRole } = require('../middleware/allowRole');
const { verifyToken } = require('../middleware/verifyToken');

router.get('/courses', getAllCourses);
router.get('/course/:id', getCourseById);
router.post('/courses', verifyToken, allowRole, isUniqueCourse, createCourse);
router.put('/courses/:id', verifyToken, allowRole, updateCourse);
router.delete('/courses/:id', verifyToken, allowRole, deleteCourse);

module.exports = router;