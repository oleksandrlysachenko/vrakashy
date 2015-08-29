module.exports = (function(){
    var express = require('express');
    var UserHandler = require('../handlers/user');
    var userRouter = express.Router();
    var userHandler = new UserHandler;

    userRouter.get('/:login',userHandler.view);
    userRouter.delete('/:login',userHandler.delete);
    userRouter.get('/:login/settings',userHandler.edit);
    userRouter.put('/:login/settings',userHandler.update);
    userRouter.get('/:login/friends',userHandler.friends);
    userRouter.put('/:login/friends?:id',userHandler.friendsAdd);
    userRouter.delete('/:login/friends?:id',userHandler.friendsDelete);



    return userRouter;
})();