module.exports = function(app){
    var bodyParser = require('body-parser');
    var userRouter = require('./user.js')(app);
    var postRouter = require('./posts.js')(app);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/user',userRouter);
    app.use('/post',postRouter);
    app.get('/login',function(req,res,next){
        res.status(200).send('login page');
    });
    app.get('/register',function(req,res,next){
       res.status(200).send('register page');
    });
    app.use(function(err, req, res, next){
        var status = err.status || 500;
        console.log(err);
        res.status(status).send(err);
    });
};

