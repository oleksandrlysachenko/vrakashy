var express = require('express');
var router = express.Router();
var MailHandler = require('../handlers/mail');
var SessionHandler = require('../handlers/session');

var MailRouter = function(){
    'use strict';

    var mail = new MailHandler();
    var session = new SessionHandler();

    router.post('/forgot', mail.sendForgotPassword);
    router.post('/invite', session.isAuthenticatedUser, mail.sendInvite);

    return router;
};
module.exports = MailRouter();