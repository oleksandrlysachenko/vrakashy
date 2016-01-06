var CONST = require('../constants');
var RESPONSE = require('../constants/response');
var mongoose = require('mongoose');
var UserSchema = mongoose.schemas.User;
var User = mongoose.model(CONST.MODELS.USER, UserSchema);
var MailerHelper = require('../helpers/mailer');

var MailHandler = function(){
    'use strict';

    var mailer = new MailerHelper();

    this.sendInvite = function (req, res, next) {
        var uId = req.session.uId;
        var receiveEmail = req.body.email;
        console.log(receiveEmail);

        User.findById(uId, function (err, model) {
            if (err) {
                return next(err);
            }

            mailer.sendMail(receiveEmail, model.profile.email, function (err, info) {
                if (err) {
                    return next(err);
                }

                return res.status(200).send({success: RESPONSE.ON_ACTION.SUCCESS});
            });
        });

    };

};

module.exports = MailHandler;
