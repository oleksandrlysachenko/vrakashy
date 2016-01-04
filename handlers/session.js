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

        res.status(200).send({success: RESPONSE.ON_AUTH.LOG_IN})
    };

    this.destroy = function (req, res) {

        if (req.session) {
            req.session.destroy();
        }

        console.timeEnd('time');

        res.status(200).send({success: RESPONSE.ON_AUTH.LOG_OUT});
    };

};

module.exports = Session;
