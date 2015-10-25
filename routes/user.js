module.exports = (function(){
    var express = require('express');
    var UserHandler = require('../handlers/user');
    var userRouter = express.Router();
    var userHandler = new UserHandler;

    userRouter.get('/demo',userHandler.demo);
    userRouter.post('/',userHandler.create);
    userRouter.get('/all',userHandler.getAll);
    userRouter.get('/:id',userHandler.auth,userHandler.view);
    userRouter.get('/',userHandler.auth,userHandler.authUser);
    userRouter.delete('/:id',userHandler.auth,userHandler.delete);
    userRouter.put('/:id',userHandler.update);
    userRouter.get('/:id/posts',userHandler.getPosts);

    return userRouter;
})();