const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoursesSchema = new Schema({
    name: String,
    info: String,
});

const Courses = mongoose.model('Courses', CoursesSchema);
module.exports = Courses;