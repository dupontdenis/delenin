const express = require('express');
const router = express.Router();
const ctrlCourses = require('../controllers/courses');

router
    .route('/')
    .get(ctrlCourses.coursesReadAll);

router
    .route('/new')
    .get(ctrlCourses.coursesForm)
    .post(ctrlCourses.coursesAddOne);

router
    .route('/:id')
    .get(ctrlCourses.coursesReadOne)

router
    .route('/delete/:id')
    .get(ctrlCourses.coursesDeleteOne)

router
    .route('/update/:id')
    .get(ctrlCourses.coursesUpdate_get)
    .post(ctrlCourses.coursesUpdate_post);




module.exports = router;