require('../config/development');

var nodemailer = require('nodemailer');
var stmpTransport = require('nodemailer-smtp-transport');

var Mailer = function () {
    'use strict';

    var mailer = nodemailer.createTransport(stmpTransport({
        service: process.env.MAILER_SERVICE,
        auth: {
            user: process.env.MAILER_MAIL,
            pass: process.env.MAILER_PASS
        }
    }));

    this.sendInvite = function (receiveEmail, senderEmail, callback) {

        mailer.sendMail({
            from: senderEmail,
            to: receiveEmail,
            subject: 'Invite',
            text: 'Invite for you.'
        }, function (error, info) {
            if (error) {
                return callback(error);
            }

            return callback();
        });
    };

    this.sendForget = function (receiveEmail, generatePass, callback) {

        mailer.sendMail({
            from: process.env.MAILER_MAIL,
            to: receiveEmail,
            subject: 'Forgot password',
            text: 'We generate a new password for you.' + generatePass
        }, function (error, info) {
            if (error) {
                return callback(error);
            }

            return callback();
        });
    };

    this.sendVerification = function (receiveEmail, loginId, generateCode, callback) {

        mailer.sendMail({
            from: process.env.MAILER_MAIL,
            to: receiveEmail,
            subject: 'Verify your registration',
            text: 'Please verify your registration, click the link: http://localhost:3030' + '/verification?id=' + loginId
            + '&code=' + generateCode
        }, function (error, info){
            if (error) {
                return callback(error);
            }

            return callback();
        });
    };
};

 module.exports = Mailer;