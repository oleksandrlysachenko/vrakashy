var mongoose = require('mongoose');
var UserSchame = mongoose.schemas.User;
var SessionSchame = mongoose.schemas.Session;
var _User = mongoose.model('user', UserSchame);
var _Session = mongoose.model('session', SessionSchame);
var Session = function(res,req,next){

    this.create = function (req, res, next) {
        var body = req.body;
        var cookie = req.cookies;
        var user = body.user;
        console.log(body);
        _User.findOne({user:user},function(err,result){
                if (err) {return next(err);}
            var user = result || undefined;
            if (user) {
                req.session._id = cookie.sessionID;
                req.session.user = user.user;
                req.session.auth = true;
                console.log(cookie.sessionID);
                res.send(user)
            }
            else {
                res.send(user)
            }
            })
    };

    this.get = function (req, res, next) {

        _Session.find(function(err,result){
            if (err) {return next(err);}
            //var user = result || undefined;
            //if (user) { req.session._id = user.id; }
       //     console.log(result);
            res.send(result)
        })
    };

};

module.exports = Session;

/*app.get('/login',function(req,res,next){
    var body = req.body;
    var user = body.user;
    var password = body.password;

    var data = {
        user : user,
        password: password
    };

    var session = new _Session(data);

    req.session.user = user;
    req.session.password = password;
    console.log(body);
    console.log(req.session);
    res.send(req.session);
});

app.get('/singUp',function(req,res,next){
    res.status(200).send('register page');
});
*/