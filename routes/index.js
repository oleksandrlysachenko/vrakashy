module.exports = function(app){
    var bodyParser = require('body-parser');
    var cookieParser = require('cookie-parser');
    var userRouter = require('./user');
    var postRouter = require('./posts');
    var sessionRoute = require('./session');


    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cookieParser());

    app.get('/', function (req, res, next) {
        res.sendfile('index.html')
    });
    app.use('/user',userRouter);
    app.use('/post',postRouter);
    app.use('/session',sessionRoute);

    /*app.use(function(err, req, res, next){
        var status = err.status || 500;

        res.status(status).send(err);
    }); */
};

