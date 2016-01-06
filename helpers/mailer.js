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

    this.sendMail = function (receiveEmail, senderEmail, callback) {

        mailer.sendMail({
            from: senderEmail,
            to: receiveEmail,
            subject: 'Test',
            text: 'Hello'
        }, function (error, info) {
            if (error) {
                return callback(error);
            }

            return callback();
        });
    };
};

 module.exports = Mailer;