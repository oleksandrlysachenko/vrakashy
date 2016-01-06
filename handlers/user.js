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

    this.setSettings = function (req, res, next) {
        var uId = req.session.uId;
        var body = req.body;
        var data = {
            profile: {
                first: body.profile.first,
                last: body.profile.last,
                email: body.profile.email
            }
        };

        User.findByIdAndUpdate(uId, {$set: data}, function (err, model) {
            if (err) {
                return next(err);
            }

            return res.status(200).send({success: RESPONSE.ON_ACTION.UPDATE});
        });
    };

    this.addToFriends = function (req, res, next) {
        var uId = req.session.uId;
        var friendId = req.query.id;

        User.findByIdAndUpdate(uId, {$push: {friends: friendId}}, function (err, model) {
            if (err) {
                return next(err);
            }

            return res.status(200).send({success: RESPONSE.ON_ACTION.UPDATE});
        });
    };

    this.getListOfUsers = function (req, res, next) {
        User.find(function (err, collection) {
            if (err) {
                return next(err);
            }

            return res.status(200).send(collection);
        });
    };

    this.getById = function (req, res, next) {
        var id = req.params.id;

        User.findById(id, function (err, model) {
            if (err) {
                return next(err);
            }

            return res.status(200).send(model);
        });
    };

    this.getListOfFriends = function (req, res, next) {
        var uId = req.session.uId;

        User
            .findOne({_id: uId})
            .populate({path: 'friends', select: '_id login posts friends profile'})
            .select('friends')
            .exec(function (err, collection) {
                if (err) {
                    return next();
                }

                return res.status(200).send(collection);
            });

    };

};

module.exports = UserHandler;
