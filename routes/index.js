module.exports = function(app){
    var bodyParser = require('body-parser');
    var userRouter = require('./user.js');
    var postRouter = require('./posts.js');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/users',userRouter);
    app.use('/posts',postRouter);
    app.get('/login',function(req,res,next){
        res.status(200).send('login page');
    });
    app.get('/register',function(req,res,next){
       res.status(200).send('register page');
    });
    app.post('/register', function(req,res,next){
        res.status(200).send('register new user');
    });
};

