module.exports = function(app) {
    var express = require('express');
    var PostHandler = require('../handlers/posts.js');
    var postRouter = express.Router();
    var postHandler = new PostHandler(app);

    postRouter.get('/', postHandler.viewAll);
    postRouter.post('/', postHandler.auth, postHandler.createPost);
    postRouter.get('/:postId', postHandler.viewPost);
    postRouter.delete('/:postId', postHandler.auth, postHandler.roleCheck, postHandler.delete);

    return postRouter;
};