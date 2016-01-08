var nodemailer = require('nodemailer');
var stmpTransport = require('nodemailer-smtp-transport');

var Mailer = function () {
    'use strict';

    var mailer = nodemailer.createTransport(stmpTransport({
        service: 'gmail',
        auth: {
            user: 'vrakashy@gmail.com',
            pass: 'vrakashymaster'
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
            from: 'vrakashy@gmail.com',
            to: receiveEmail,
            subject: 'Forgot password',
            text: 'We generate a new password for you.' + generatePass
        }, function (error, info) {
            if (error) {
                return callback(error);
            }

            console.log(info);

            return callback();
        });
    }
};

 module.exports = Mailer;