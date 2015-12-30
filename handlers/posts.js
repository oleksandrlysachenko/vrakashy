var CONST = require('../constants');

var Posts = function(db) {

    var _User = db.model(CONST.MODELS.USER);
    var _Post = db.model(CONST.MODELS.POST);

    this.auth = function(req,res,next){
        if (req.session._id) {
            next();
        }
        else {
            res.status(401).send();
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
        _Post
            .find()
            .populate('author')
            //.lean()
            .exec(function (err, response) {
                if (err) { return next(err); }
                res.status(200).send(response);
            });

    };
    this.createPost = function(req,res,next) {
        var body = req.body;
        var description = body.description;
        var tags = body.tags;
        var content = body.content;
        var author = body.author;
        var data = {
            description : description,
            tags : tags,
            content : content,
            author : author
        };
        var post = new _Post(data);
        post.save(function(err, postre) {
            if (err) { return next(err) }
           // res.send(post);
           _User.findByIdAndUpdate(author, {$push: {posts: post._id}}, function (err, response) {
                if (err) { return next(err) }
                res.send(post);
            })
        });
    };

    this.viewPost = function(req,res,next) {
        var postID = req.params.postId;

        _Post
            .findById(postID)
            .populate('author')
            //.lean()
            .exec(function (err, response) {
                if (err) { return next(err); }
                res.status(200).send(response);
            });

    };

    this.delete = function(req,res,next) {
        var postID = req.params.postId;
        _Post.findByIdAndRemove(postID, function(err, response){
            if (err){ return next(err); }
            res.status(200).send(response);
        });
    }
};
module.exports = Posts;