var express = require('express');
var router = express.Router();
var UserHandler = require('../handlers/user');
var SessionHandler = require('../handlers/session');

var UserRouter = function(){
    'use strict';

    var user = new UserHandler();
    var session = new SessionHandler();

    router.get('/', session.isAuthenticatedUser, user.getBySession);
    router.put('/settings',session.isAuthenticatedUser, user.setSettings);
    router.get('/search', session.isAuthenticatedUser,  user.getListOfUsers);
    router.route('/friends')
        .get(session.isAuthenticatedUser, user.getListOfFriends)
        .put(session.isAuthenticatedUser, user.addToFriends);
    router.post('/')
    router.get('/:id', session.isAuthenticatedUser, user.getById);

    return router;
};
module.exports = UserRouter();