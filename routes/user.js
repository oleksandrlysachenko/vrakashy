module.exports = function(app){
    var express = require('express');
    var UserHandler = require('../handlers/user');
    var userRouter = express.Router();
    var userHandler = new UserHandler(app);

    userRouter.post('/',userHandler.create);
    userRouter.get('/',userHandler.getAll);
    userRouter.get('/:id',userHandler.view);
    userRouter.delete('/:id',userHandler.auth,userHandler.roleCheck,userHandler.delete);
    userRouter.get('/:id/settings',userHandler.auth,userHandler.edit);
    userRouter.put('/:id/settings',userHandler.auth,userHandler.update);
    userRouter.get('/:id/friends',userHandler.friends);
    userRouter.put('/:id/friends?:idAdd',userHandler.auth,userHandler.friendsAdd);
    userRouter.delete('/:id/friends?:idDelete',userHandler.auth,userHandler.friendsDelete);
    userRouter.get('/:id/posts',userHandler.getPosts);

    return userRouter;
};