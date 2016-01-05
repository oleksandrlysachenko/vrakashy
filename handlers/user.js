var CONST = require('../constants');
var RESPONSE = require('../constants/response');
var mongoose = require('mongoose');
var UserSchema = mongoose.schemas.User;
var User = mongoose.model(CONST.MODELS.USER, UserSchema);

var UserHandler = function(){

    this.getBySession = function (req, res, next) {
        var uId = req.session.uId;

        User.findById(uId, function (err, model) {
            if (err) {
                return next(err);
            }

            return res.status(200).send(model);
        });

    };

    this.saveSettings = function (req, res, next) {
        var uId = req.session.uId;
        var body = req.body;

        User.findByIdAndUpdate(uId, {$set: body}, function (err, model) {
            if (err) {
                return next(err);
            }

            return res.status(200).send({success: RESPONSE.ON_ACTION.SAVE_CHANGE})
        });
    };

};

module.exports = UserHandler;
