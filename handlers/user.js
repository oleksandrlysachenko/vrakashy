var mongoose = require('mongoose');
var UserSchame = mongoose.schemas.User;
var PostSchame = mongoose.schemas.Post;
var SessionSchame = mongoose.schemas.Session;
var _User = mongoose.model('user', UserSchame);
var Post = mongoose.model('post', PostSchame);
var _Session = mongoose.model('session', SessionSchame);
var User = function(res,req,next){

    this.create = function (req, res, next) {
        var body = req.body;
        var cookie = req.cookies;
        var user = body.user;
        var email = body.email;
        var password = body.password;
        var firstName = body.firstName;
        var lastName = body.lastName;
        var userStatus = body.userStatus;
        var data = {
            user : user,
            password : password,
            email : email || undefined,
            name : {
                first : firstName || undefined,
                last : lastName || undefined
            },
            userStatus : userStatus || 'User'
        };
        var user = new _User(data);
        user.save(function (err, response) {
            if (err) {return next(err); }
            req.session._id = cookie.sessionID;
            req.session.user = response.user;
            req.session.userID = response._id;
            req.session.auth = true;
            res.send(response);
        });
    };
    this.auth = function(req,res,next){
        if (req.session._id) {
            next();
        }
        else {
            res.status(401).send();
        }
    };

    this.view = function(req, res, next){
        var id = req.params.id;
        console.log('id ='+id);
        _User.findById(id,function(err, response){
            if (err){ return next(err);}
            res.status(200).send(response)
        });
    };
    this.authUser = function(req,res,next){
        var id = req.session.userID;
        console.log(id);
        _User.findById(id, function(err, response){
            if (err) { return next(err) }
            res.status(200).send(response)
        });
    };
    this.delete = function(req,res,next){
        var id = req.params.id;
        _User.findByIdAndRemove(id, function(err, response){
            if (err){ return next(err); }
            res.status(200).send(response);
        });
    };
    this.update = function(req,res,next){
        var body = req.body;
        var id = body._id;
        var user = body.user;
        var email = body.email;
        var password = body.password;
        var firstName = body.firstName;
        var lastName = body.lastName;
        var data = {
            user : user,
            password : password,
            email : email || undefined,
            name : {
                first : firstName || undefined,
                last : lastName || undefined
            }
        };
        //console.log(data);
        _User.update({_id: id}, {$set : data}, function(err,user){
            if (err){ return next(err);}
            res.status(200).send(user);
        });
    };
    this.getAll = function(req,res,next){
            _User
                .find()
                .populate('posts')
                .populate('friends')
                //.lean()
                .exec(function (err, response) {
                    if (err) {
                        return next(err);
                    }
                    res.status(200).send(response);
                });

    };
    this.getPosts = function(req,res,next){
        var id = req.params.id;
        _User
            .findById(id)
            .populate('posts')
            .exec(function(err, response){
                if (err) {return next(err)}
                res.status(200).send(response.posts)
            });
    }
};

module.exports = User;
