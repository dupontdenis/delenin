const axios = require('axios');
const debug = require('debug')('app_server');

const coursesReadAll = (req, res) => {
    debug('-Server------------- READ ALL-------------------------------')
    axios.get('http://localhost:3000/api/courses')
        .then(function (response) {
            res.render('courses-list', {
                courses: response.data.courses
            });
        })
        .catch(function (error) {
            // handle error
            debug(error);
        })
};

const coursesReadOne = (req, res) => {
    debug('-Server------------- READ ONE-------------------------------')

    axios.get(`http://localhost:3000/api/courses/${req.params.id}`)
        .then(function (response) {
            res.render('course-info', {
                course: response.data
            });
        })
        .catch(function (error) {
            // handle error
            debug(error);
        })
};

const coursesDeleteOne = async (req, res) => {
    debug('-Server------------- DELETE ONE-------------------------------')
    try {
        await axios.delete(`http://localhost:3000/api/courses/${req.params.id}`)

        res.redirect(`/courses/`);
    } catch (error) {
        debug(error);
    }
   


         

};



const renderForm = (req, res) => {
    res.render('course-form',
        {
            title: `New Course`,
            error: req.query.err
        }
    );
};

const coursesForm = (req, res) => {
    debug('-Server---------------   FORM  -----------------------')
    renderForm(req, res);
};

const coursesAddOne = async (req, res) => {
    debug('-Server---------------   ADD ONE  -----------------------')
    if (!req.body.info || !req.body.name) {
        res.redirect(`/courses/new?err=val`);
    }
    else {
        try {
            const response = await axios.post('http://localhost:3000/api/courses/', req.body)
            res.redirect("/courses");
        } catch (error) {
            debug(error);
        }
    }
};
// rempli le form !
const coursesUpdate_get = async (req, res) => {
    debug('-Server------------- coursesUpdateOne -------------------------------')
    try {
        const { data } = await axios.get(`http://localhost:3000/api/courses/${req.params.id}`)

        res.render('course-form', {
            title: `Update`,
            course: data
        });

    } catch (error) {
        debug(error)
    }
};
const coursesUpdate_post = async (req, res) => {
    debug('server---------------   ADD UPDATE  -----------------------')

    try {
        if (!req.body.info || !req.body.name) {
            res.redirect(`/courses/update/${req.params.id}?err=val`);
        }
        else {
            await axios.put(`http://localhost:3000/api/courses/${req.params.id}`, req.body)
            res.redirect("/courses");
        }
    } catch (error) {
        debug(error);
    }

};

module.exports = {
    coursesReadAll,
    coursesReadOne,
    coursesAddOne,
    coursesDeleteOne,
    coursesForm,
    coursesUpdate_get,
    coursesUpdate_post
};