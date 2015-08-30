module.exports = (function(){
    var express = require('express');
    var UserHandler = require('../handlers/user');
    var userRouter = express.Router();
    var userHandler = new UserHandler;

    userRouter.get('/:login',userHandler.view);
    userRouter.delete('/:login',userHandler.auth,userHandler.roleCheck,userHandler.delete);
    userRouter.get('/:login/settings',userHandler.auth,userHandler.edit);
    userRouter.put('/:login/settings',userHandler.auth,userHandler.update);
    userRouter.get('/:login/friends',userHandler.friends);
    userRouter.put('/:login/friends?:id',userHandler.auth,userHandler.friendsAdd);
    userRouter.delete('/:login/friends?:id',userHandler.auth,userHandler.friendsDelete);

    return userRouter;
})();