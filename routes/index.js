module.exports = function(app){
    var bodyParser = require('body-parser');
    var userRouter = require('./user.js');
    var postRouter = require('./posts.js');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/users',userRouter);
    app.use('/posts',postRouter);
};

