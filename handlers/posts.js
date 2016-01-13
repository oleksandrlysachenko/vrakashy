var CONST = require('../constants');
var RESPONSE = require('../constants/response');
var mongoose = require('mongoose');
var UserSchema = mongoose.schemas.User;
var PostSchema = mongoose.schemas.Post;
var User = mongoose.model(CONST.MODELS.USER, UserSchema);
var Post = mongoose.model(CONST.MODELS.POST, PostSchema);

var Posts = function() {
    'use strict';

    this.createPost = function(req,res,next) {
        var uId = req.session.uId;
        var body = req.body;

        var post = new Post(body);
        post.author = uId;

        post.save(function (err, postModel) {
            if (err) {
                return next(err);
            }

            User.findByIdAndUpdate(uId, {$push: {posts: postModel._id}}, function (err, userModel) {
                if (err) {
                    return next(err);
                }

                res.status(200).send(postModel);
            });
        });
    };

    this.getListOfPosts = function(req, res, next) {
        Post.find()
            .populate('author', 'login')
            //.lean()
            .exec(function (err, collection) {
                if (err) {
                    return next(err);
                }

                res.status(200).send(collection);
            });
    };

    this.getById = function(req,res,next) {
        var id = req.params.id;

        Post.findById(id)
            .populate('author', 'login')
            //.lean()
            .exec(function (err, model) {
                if (err) {
                    return next(err);
                }

                res.status(200).send(model);
            });

    };

    this.deleteById = function(req,res,next) {
        var id = req.params.id;

        Post.findByIdAndRemove(id, function(err, model) {
            if (err){
                return next(err);
            }

            res.status(200).send({success: RESPONSE.ON_ACTION.DELETE});
        });
    }
};
module.exports = Posts;