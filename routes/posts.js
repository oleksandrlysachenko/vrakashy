module.exports = function(){
    var express = require('express');
    var PostHandler = require('../handlers/posts');
    var postRouter = express.Router();
    var postHandler = new PostHandler;

    postRouter.get('/',postHandler.viewAll);
    postRouter.post('/',postHandler.auth,postHandler.createPost);
    postRouter.get('/:postId',postHandler.auth,postHandler.viewPost);
    postRouter.delete('/:postId',postHandler.auth,postHandler.delete);

    return postRouter;
};