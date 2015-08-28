module.exports = function(app){
    var bodyParser = require('body-parser');
    var userRouter = require('./user.js');

    app.use(bodyParser.json());
    app.use('/users',userRouter);
};

