const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
const apiRouter = require('./app_api/routes/index');
app.use('/api', apiRouter);
 
const indexRouter = require('./app_server/routes/index');
app.use('/courses', indexRouter);



const path = require('path');
// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

app.listen(3000,()=>console.log("http://localhost:3000/courses"));
