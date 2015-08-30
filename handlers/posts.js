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
        res.status(200).send('create post');
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