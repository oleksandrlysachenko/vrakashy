var mongoose = require('mongoose');
var UserSchame = mongoose.schemas.User;
var SessionSchame = mongoose.schemas.Session;
var _User = mongoose.model('user', UserSchame);
var _Session = mongoose.model('session', SessionSchame);
var Session = function(res,req,next){

    this.get = function (req, res, next) {
        var cookie = req.cookies;
        var user = req.query.user;
        var password = req.query.password;
        _User.findOne({user:user,password:password}, function(err,result){
            //console.log(result);
            if (err) { return next(err) }
            var user = result || undefined;
            //console.log(user);
            if (user) {
                req.session._id = cookie.sessionID.substr(2,32);
                req.session.user = user.user;
                req.session.userID = user._id;
                req.session.auth = true;
              //  console.log('true');
              //  console.log(result);
                res.send(user)
            }
            else {
             //   console.log('false');
                res.send(user)
            }
        })
    };

    this.del = function(req,res,next){
        _Session.find(function(err,result){
            if (err) { return next(err) }
            req.session.destroy();
            res.send(result);
        });
    }
};

module.exports = Session;
