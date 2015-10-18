module.exports = (function(){
    var express = require('express');
    var UserHandler = require('../handlers/user');
    var userRouter = express.Router();
    var userHandler = new UserHandler;

    userRouter.post('/',userHandler.create);
    userRouter.get('/',userHandler.getAll);
    userRouter.get('/:id',userHandler.view);
    userRouter.delete('/:id',userHandler.delete);
    userRouter.get('/:id/settings',userHandler.auth,userHandler.edit);
    userRouter.put('/:id/settings',userHandler.auth,userHandler.update);
    userRouter.get('/:id/friends',userHandler.friends);
    userRouter.put('/:id/friendsAdd?:idAdd',userHandler.auth,userHandler.friendsAdd);
    userRouter.delete('/:id/friendsDelete?:idDelete',userHandler.auth,userHandler.friendsDelete);
    userRouter.get('/:id/posts',userHandler.getPosts);

    return userRouter;
})();