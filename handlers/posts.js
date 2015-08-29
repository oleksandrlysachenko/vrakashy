var Posts = function(res,req,next) {
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