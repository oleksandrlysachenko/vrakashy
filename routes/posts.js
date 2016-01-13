var express = require('express');
var router = express.Router();
var PostHandler = require('../handlers/posts');
var SessionHandler = require('../handlers/session');

var PostRouter = function(){
    'use strict';

    var post = new PostHandler();
    var session = new SessionHandler();

    router.post('/', session.isAuthenticatedUser, post.createPost);
    router.get('/search', session.isAuthenticatedUser, post.getListOfPosts);
    router.route('/:id')
        .get(session.isAuthenticatedUser, post.getById)
        .delete(session.isAuthenticatedUser, post.deleteById);


    return router;
};

module.exports = PostRouter();