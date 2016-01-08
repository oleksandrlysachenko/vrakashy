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

        User.findById(uId, function (err, model) {
            if (err) {
                return next(err);
            }

            mailer.sendInvite(receiveEmail, model.profile.email, function (err, info) {
                if (err) {
                    return next(err);
                }

                return res.status(200).send({success: RESPONSE.ON_ACTION.SUCCESS});
            });
        });

    };

    this.sendForgotPassword = function (req, res, next) {
        var email = req.body.email;
        var generatePass;

        User.findOne({'profile.email': email}, function (err, model) {
            if (err) {
                return next(err);
            }

            if (!model) {
                return res.status(400).send({error: RESPONSE.BAD_REQUEST});
            }

            //TODO put password generator
            generatePass = 'newPass';

            User.findByIdAndUpdate(model._id, {$set: {password: generatePass}} ,function (err, updateModel) {
                if (err) {
                    return next(err);
                }

                mailer.sendForget(model.profile.email, generatePass, function (err, info) {
                    if (err) {
                        return next(err);
                    }

                    return res.status(200).send({success: RESPONSE.ON_ACTION.SUCCESS});
                });
            });
        });
    };

};

module.exports = MailHandler;
