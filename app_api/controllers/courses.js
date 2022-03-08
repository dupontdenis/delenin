const mongoose = require('mongoose');
const Courses = require('../models/courses');
mongoose.connect('mongodb+srv://delenin:tonpass@cluster0.c1gwa.mongodb.net/courses?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true });

const debug = require('debug')('app_api');


const coursesReadAll = async (req, res) => {
    try {
        const courses = await Courses.find({});
        res.json({ courses: courses });
    } catch (error) {
        res.status(404).send(error)
    }

}

const coursesCreateOne = async (req, res) => {
    try {
        const course = await Courses.create(req.body)
        res.status(201).json({ message: 'Objet enregistré !'})

    } catch (error) {
        res.status(404).send(error)
    }

}


const coursesReadOne = async (req, res) => {
    debug("API--- coursesReadOne ---");
    const course = await Courses.findById(req.params.id)
    if (!course) res.status(404).send(`The course with id:${req.params.id} was not found`)
    res.send(course);
}


const coursesUpdateOne = async (req, res) => {

    try {
        const course = new Courses(
            {
                ...req.body,
                _id: req.params.id
            }
        );
    
        const thecourse = await Courses.findByIdAndUpdate(req.params.id, course) 

        res.send(thecourse);

    } catch (error) {
        debug (error)
    }
    
}

const coursesDeleteOne = async (req, res) => {
    debug("API--- coursesDeleteOne ---");
    const course = await Courses.findByIdAndDelete(req.params.id)
    if (!course) res.status(404).send(`The course with id:${req.params.id} was not found`)
    res.send(null);
}

module.exports = {
    coursesReadAll,
    coursesCreateOne,
    coursesReadOne,
    coursesUpdateOne,
    coursesDeleteOne
};