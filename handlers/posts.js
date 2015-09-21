var mongoose = require('mongoose');
var UserSchame = mongoose.schemas.User;
var PostSchame = mongoose.schemas.Post;
var _User = mongoose.model('user', UserSchame);
var _Post = mongoose.model('post', PostSchame);
var Posts = function(res,req,next) {
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
    this.viewAll = function(req,res,next) {
        res.status(200).send('view all posts');
    };
    this.createPost = function(req,res,next) {
        var body = req.body;
        var post = new _Post(body);
        post.save(function(err,post){
            if (err){return next(err)}
            res.status(200).send('create post! ' + post);
        });
    };
    this.viewPost = function(req,res,next) {
        var postID = req.params.postId;
        res.status(200).send('view current post: ' + postID);
    };
    this.delete = function(req,res,next) {
        var postID = req.params.postId;
        res.status(200).send('delete current post: ' + postID)
    }
};
module.exports = Posts;