var CONST = require('../constants');
var RESPONSE = require('../constants/response');
var mongoose = require('mongoose');
var UserSchema = mongoose.schemas.User;
var User = mongoose.model(CONST.MODELS.USER, UserSchema);
var SessionHandler = require('./session');
var RandomHelper = require('../helpers/randomPass');
var MailerHelper = require('../helpers/mailer');


var Registration = function () {
    'use strict';

    var session = new SessionHandler();
    var mailer = new MailerHelper();

    this.signUp = function (req, res, next) {

        console.time('time');

        var body = req.body;
        body.options = {};

        if (!body || !body.login || !body.password || !body.confirmPassword || !body.profile.email) {
            return res.status(400).send({error: RESPONSE.NOT_ENOUGH_PARAMS});
        }

        if (body.password !== body.confirmPassword) {
            return res.status(400).send({error: RESPONSE.PASSWORD_NOT_CONFIRM});
        }

        User.findOne({login: body.login}, function (err, model) {
            if (err) {
                return next(err);
            }

            if (model) {
                return res.status(400).send({error: RESPONSE.ON_AUTH.REGISTER_LOGIN_USED})
            }

            //TODO comment to make a test
            //body.options.verifyCode = RandomHelper().generate('alphabetical', 8);
            body.options.verifyCode = 'abcd1234';

            var newUser = new User(body);

            newUser
                .save(function (err, model) {
                    if (err) {
                        return next(err);
                    }

                    mailer.sendVerification(model.profile.email, model._id, model.options.verifyCode, function (err, info) {
                        if (err) {
                            return next(err);
                        }
                        //TODO delete after test send '_id' of model in response!!!
                        return res.status(200).send({success: RESPONSE.ON_ACTION.WAITE_VERIFICATION, id: model._id});
                        //return session.register(req, res, model._id.toString());
                    });
                });
        });
    };

    this.signIn = function (req, res, next) {

        console.time('time');

        var body = req.body;

        if (!body || !body.login || !body.password || !body.confirmPassword) {
            return res.status(400).send({error: RESPONSE.NOT_ENOUGH_PARAMS});
        }

        if (body.password !== body.confirmPassword) {
            return res.status(400).send({error: RESPONSE.PASSWORD_NOT_CONFIRM});
        }

        User
            .findOne({login: body.login, password: body.password}, function (err, model) {
                if (err) {
                    return next(err);
                }

                if (!model) {
                   return res.status(401).send({error: RESPONSE.WRONG_LOGIN_DATA});
                }

                if (model.options.verifyRegistration == false) {
                    return res.status(401).send({error: RESPONSE.ON_AUTH.NOT_VERIFY});
                }

                return session.register(req, res, model._id.toString());
            });
    };

    this.signOut = function (req, res, next) {

        console.time('time');

        var uId = req.session.uId;

        User
            .findById(uId, function (err, model) {
                if (err) {
                    return next(err);
                }

                if (!model) {
                    return res.status(401).send({error: RESPONSE.USER_NOT_FIND});
                }

                return session.destroy(req, res);
            });
    };

    this.verification = function (req, res, next) {
        var query = req.query;

        if (!query || !query.id || !query.code) {
            return res.status(400).send({error: RESPONSE.NOT_ENOUGH_PARAMS});
        }


        User.findById(query.id, function (err, model) {
            if (err) {
                return next(err);
            }

            if (!model) {
                return res.status(400).send({error: RESPONSE.USER_NOT_FIND});
            }

            User.findByIdAndUpdate(query.id, {$set: {options: {verifyRegistration: true}}},function (err, model) {
                if (err) {
                    return next(err);
                }

                return res.status(200).send({success: RESPONSE.ON_AUTH.VERIFY});
            });
        });
    };
};
module.exports = Registration;