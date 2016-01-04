var CONST = require('../constants');
var RESPONSE = require('../constants/response');
var mongoose = require('mongoose');
var UserSchema = mongoose.schemas.User;
var User = mongoose.model(CONST.MODELS.USER, UserSchema);
var SessionHandler = require('./session');

var Registration = function () {

    var session = new SessionHandler();

    this.signUp = function (req, res, next) {

        console.time('time');

        var body = req.body;
        var data;

        if (!body || !body.login || !body.pass) {
            res.status(400).send({error: RESPONSE.NOT_ENOUGH_PARAMS});
        }

        data = {
            login: body.login,
            password: body.pass,
            profile: {
                first: body.first,
                last: body.last,
                email: body.email
            }
        };

        var newUser = new User(data);

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

        if (!body || !body.login || !body.pass) {
            res.status(400).send({error: RESPONSE.NOT_ENOUGH_PARAMS});
        }

        User
            .findOne({login: body.login, password: body.pass}, function (err, model) {
                if (err) {
                    return next(err);
                }

                return session.register(req, res, model._id.toString());
            });
    };

    this.signOut = function (req, res, next) {

        console.time('time');

        var body = req.body;

        if (!body || !body.login || !body.pass) {
            res.status(400).send({error: RESPONSE.NOT_ENOUGH_PARAMS});
        }

        User
            .findOne({login: body.login, password: body.pass}, function (err, model) {

                return session.destroy(req, res);
            });
    };
};
module.exports = Registration;