var CONST = require('../constants');
var RESPONSE = require('../constants/response');
var mongoose = require('mongoose');
var UserSchema = mongoose.schemas.User;
var User = mongoose.model(CONST.MODELS.USER, UserSchema);

var Registration = function () {

    this.signUp = function (req, res, next) {

        console.time('time');

        var body = req.body;
        var data;

        if (!body) {
            res.status(400).send(RESPONSE.NOT_ENOUGH_PARAMS);
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

                console.timeEnd('time');
                res.status(200).send(RESPONSE.ON_ACTION.SUCCESS);
            });
    };

    this.signIn = function (req, res, next) {
        res.status(200).send('Sign In')
    }
};
module.exports = Registration;