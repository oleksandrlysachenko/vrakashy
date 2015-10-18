module.exports = (function(){
    var express = require('express');
    var SessionHandler = require('../handlers/session');
    var sessionRouter = express.Router();
    var sessionHandler = new SessionHandler;

    sessionRouter.post('/',sessionHandler.create);
    sessionRouter.get('/',sessionHandler.get);
    //sessionRouter.get('/',sessionHandler.view);

    return sessionRouter;
})();
