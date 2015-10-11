var mongoose = require('mongoose');
var UserSchame = mongoose.schemas.User;
var PostSchame = mongoose.schemas.Post;
var _User = mongoose.model('user', UserSchame);
var Post = mongoose.model('post', PostSchame);
var User = function(res,req,next){

    this.create = function (req, res, next) {
        var body = req.body;
        var user = new _User(body);
        user.save(function (err, user) {
            if (err) {return next(err); }
            res.status(200).redirect('../#users');
        });
    };

    this.auth = function(req,res,next){
        if (true) {
            next();
        } else {
            res.status(401).send('must be authorized');
            next('must be authorized');
        }
    };
    this.roleCheck = function(req,res,next){ // admins
        if (true) {
            next();
        } else {
            res.status(403).send('you don`t have permissions');
            next('you don`t have permissions')
        }
    };
    this.view = function(req, res, next){
        var id = req.params.id;
        _User.findById(id,function(err, response){
            if (err){ return next(err);}
            res.status(200).send('request for user: ' + response)
        });
    };
    this.delete = function(req,res,next){
        var id = req.params.id;
        _User.findByIdAndRemove(id, function(err, response){
            if (err){ return next(err); }
            res.status(200).send('delete user: ' + id);
        });
    };
    this.edit = function(req,res,next){
        var id = req.params.id;
        _User.findById(id,function(err, response){
            if (err){ return next(err);}
            res.status(200).send('user ' + id + ' request for settings :' + response);
        });
    };
    this.update = function(req,res,next){
        var id = req.params.id;
        var body = req.body;
        _User.update({_id: id}, {$set : body}, function(err,user){
            if (err){ return next(err);}
            res.status(200).send(user);
        });
    };
    this.friends = function(req,res,next){
        var id = req.params.id;
        _User
            .findById({_id: id})
            .populate('friends')
            .exec(function(err,response){
            if (err){ return next(err);}
            res.status(200).send('user ' + id + ' friends list: ' + response.friends);
        });
    };
    this.friendsAdd = function(req,res,next){
        var id = req.params.id;
        var idAdd = req.query.idAdd;
        _User.findByIdAndUpdate(id, {$push: {friends: idAdd}}, function(err, response){
            if (err) {return next(err);}
            res.status(200).send('user ' + id + ' add ' + idAdd +
            ' to friends list');
        });
    };
    this.friendsDelete = function(req,res,next){
        var id = req.params.id;
        var idDelete = req.query.idDelete;
         _User.findByIdAndUpdate(id, {$pull: {friends: idDelete}}, function(err,response){
            if (err){return next(err)}
            res.status(200).send('user ' + id + ' delete ' + idDelete +
            ' from friends list');
        });
    };
    this.getAll = function(req,res,next){
        _User
            .find()
            .populate('posts')
            .populate('friends')
            //.lean()
            .exec(function (err, response) {
                if (err) { return next(err); }
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
