var model = require('../models/index');
var RegistrationHandler = require('../handlers/registration');
var userRouter = require('./user');
var postRouter = require('./posts');

module.exports = function(app){
    'use strict';

    var registration = new RegistrationHandler();

    app.get('/', function (req, res, next) {
        res.status(200).send('Express start success');
    });

    app.post('/signUp', registration.signUp);
    app.post('/signIn', registration.signIn);
    app.use('/user',userRouter);
    app.use('/post',postRouter);

    app.use(function (err, req, res, next) {
        var status = err.status || 500;
        console.error(err.message);
        res.status(status).send(err);
    })
};

