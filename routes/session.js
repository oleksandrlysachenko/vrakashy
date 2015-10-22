module.exports = (function(){
    var express = require('express');
    var SessionHandler = require('../handlers/session');
    var sessionRouter = express.Router();
    var sessionHandler = new SessionHandler;

    sessionRouter.get('/',sessionHandler.del);
    sessionRouter.get('/login?:user?:password',sessionHandler.get);
    //sessionRouter.delete('/',sessionHandler.del);

    return sessionRouter;
})();
