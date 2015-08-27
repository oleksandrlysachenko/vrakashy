module.exports = (function(app){
    var bodyParser = require('body-parser');
    var userRouter = require('./user.js');

    app.all('*', function(req,res,next){
        console.log('server GET send');
        res.status(200).send(req.ip);
    });
})();