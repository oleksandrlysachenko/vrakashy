var CONST = require('../constants');
var RESPONSE = require('../constants/response');
var mongoose = require('mongoose');
var UserSchema = mongoose.schemas.User;
var User = mongoose.model(CONST.MODELS.USER, UserSchema);
var SessionHandler = require('./session');

var Registration = function () {
    'use strict';

    var session = new SessionHandler();

    this.signUp = function (req, res, next) {

        console.time('time');

        var body = req.body;

        if (!body || !body.login || !body.password || !body.confirmPassword || !body.profile.email) {
            return res.status(400).send({error: RESPONSE.NOT_ENOUGH_PARAMS});
        }

        if (body.password !== body.confirmPassword) {
            return res.status(400).send({error: RESPONSE.PASSWORD_NOT_CONFIRM});
        }

        var newUser = new User(body);

        newUser
            .save(function (err, model) {
                if (err) {
                    return next(err);
                }

                return session.register(req, res, model._id.toString());
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
};
module.exports = Registration;