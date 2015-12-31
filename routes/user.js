var express = require('express');
var userRouter = express.Router();
var UserHandler = require('../handlers/user');

module.exports = function(db){
    'use strict';

    var userHandler = new UserHandler(db);

    userRouter.post('/',userHandler.create);
    userRouter.get('/all',userHandler.getAll);
    userRouter.get('/:id',userHandler.auth,userHandler.view);
    userRouter.get('/',userHandler.auth,userHandler.authUser);
    userRouter.delete('/:id',userHandler.auth,userHandler.delete);
    userRouter.put('/:id',userHandler.update);
    userRouter.get('/:id/posts',userHandler.getPosts);

    return userRouter;
};