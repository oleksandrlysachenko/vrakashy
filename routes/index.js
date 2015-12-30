module.exports = function(app, db){
    'use strict';

    var model = require('../models/index')(db);
    var userRouter = require('./user');
    var postRouter = require('./posts');

    app.get('/', function (req, res, next) {

        var arr = [
            1,2,3,4,5,6,7,8,9,10,
            1,2,3,4,5,6,7,8,9,10,
            1,2,3,4,5,6,7,8,9,10,
            1,2,3,4,5,6,7,8,9,10,
            1,2,3,4,5,6,7,8,9,10,
            1,2,3,4,5,6,7,8,9,10,
            1,2,3,4,5,6,7,8,9,10,
            1,2,3,4,5,6,7,8,9,10,
            1,2,3,4,5,6,7,8,9,10,
            1,2,3,4,5,6,7,8,9,10,
            1,2,3,4,5,6,7,8,9,10,
            1,2,3,4,5,6,7,8,9,10,
            1,2,3,4,5,6,7,8,9,10,
            1,2,3,4,5,6,7,8,9,10
        ];
        console.time("time1");
        var newArr = [],
            arrLength = arr.length;
        for (var i=0; i<arrLength; i++) {
            newArr.push(arr[i]);
        }
        console.timeEnd("time1");

     res.status(200).send('success');
     });

    app.use('/user',userRouter);
    app.use('/post',postRouter);

    app.use(function (err, req, res, next) {
        var status = err.status || 500;
        res.status(status).send(err);
    })
};

