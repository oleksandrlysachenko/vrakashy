module.exports = (function(){
    var express = require('express');
    var UserHandler = require('../handlers/user');
    var userRouter = express.Router();
    var userHandler = new UserHandler;

    userRouter.get('/',userHandler.getAll);

    return userRouter;
})();