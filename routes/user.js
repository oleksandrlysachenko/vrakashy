module.exports = (function(){
    var express = require('express');
    var UserHandler = require('../handlers/user');
    var userRouter = express.Router();
    var userHandler = new UserHandler;

    userRouter.get('/:login',userHandler.getUser);
    userRouter.get('/:login/settings',userHandler.getUserSettings);

    return userRouter;
})();