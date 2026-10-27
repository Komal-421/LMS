const router = require('express').Router();

const { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse } = require('../controllers/courseController');

router.get('/courses', getAllCourses);
router.get('/course/:id', getCourseById);
router.post('/courses', createCourse);
router.put('/courses/:id', updateCourse);
router.delete('/courses/:id', deleteCourse);

module.exports = router;