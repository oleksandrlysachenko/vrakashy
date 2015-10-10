module.exports = function(app){
    var bodyParser = require('body-parser');
    var userRouter = require('./user.js');
    var postRouter = require('./posts.js');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.get('/', function (req, res, next) {
        res.sendfile('index.html');
    });
    app.use('/user',userRouter);
    app.use('/post',postRouter);
    app.get('/login',function(req,res,next){
        res.status(200).send('login page');
    });
    app.get('/singUp',function(req,res,next){
       res.status(200).send('register page');
    });
    /*app.use(function(err, req, res, next){
        var status = err.status || 500;

        res.status(status).send(err);
    }); */
};

