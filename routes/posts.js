module.exports = (function(){
    var express = require('express');
    var PostHandler = require('../handlers/posts.js');
    var postRouter = express.Router();
    var postHandler = new PostHandler;

    postRouter.get('/',postHandler.viewAll);
    postRouter.post('/',postHandler.createPost);
    postRouter.get('/:postId',postHandler.viewPost);
    postRouter.delete('/:postId',postHandler.delete);

    return postRouter;
})();