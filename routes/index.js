module.exports = function(app){
    var bodyParser = require('body-parser');
    var userRouter = require('./user.js');

    app.use(bodyParser.json());
    app.use('/', function(req,res,next){
        console.log('GET send to server');
        res.status(200).send(req.ip);
    });

    app.use('/user',userRouter);
};