var CONST = require('../constants');
var RESPONSE = require('../constants/response');
var mongoose = require('mongoose');
var UserSchema = mongoose.schemas.User;
var User = mongoose.model(CONST.MODELS.USER, UserSchema);

var Session = function(){

    this.register = function (req, res, userId) {
        req.session.loggedIn = true;
        req.session.uId = userId;

        console.timeEnd('time');

        return res.status(200).send({success: RESPONSE.ON_AUTH.LOG_IN})
    };

    this.destroy = function (req, res) {
        if (req.session) {
            req.session.destroy();
        }

        console.timeEnd('time');

        return res.status(200).send({success: RESPONSE.ON_AUTH.LOG_OUT});
    };

    this.isAuthenticatedUser = function (req, res, next) {

        var err;

        if (req.session && req.session.uId && req.session.loggedIn) {
            return next();

        } else {
            err = new Error(RESPONSE.ON_AUTH.UN_AUTHORIZED);
            err.status = 401;
            return next(err);
        }

    };
};
module.exports = Session;
