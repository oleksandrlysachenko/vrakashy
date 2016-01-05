var express = require('express');
var router = express.Router();
var UserHandler = require('../handlers/user');
var SessionHandler = require('../handlers/session');

var UserRouter = function(){
    'use strict';

    var user = new UserHandler();
    var session = new SessionHandler();

    router.get('/', session.isAuthenticatedUser, user.getBySession);

    return router;
};
module.exports = UserRouter();