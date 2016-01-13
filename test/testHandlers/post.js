'use strict';

var request = require('supertest');
var expect = require('chai').expect;
var CONST = require('../../constants/index');
var USERS = require('../testHelpers/usersTemplate');
var POSTS = require('../testHelpers/postsTemplate');
var async = require ('async');
var PreparingDB = require('./preparingDatabase');

var app = require('../../app');

describe('Post functionality', function () {
    this.timeout(10000);

    var agent = request.agent(app);
    var loginData = USERS.TEMP_LOGIN_USER;
    var postData = POSTS.TEMP_POST;
    var postId;

    before(function (done) {
        this.timeout(40000);
        console.log('>>> before');

        var preparingDB = new PreparingDB();

        async.series([
            preparingDB.dropCollection(CONST.MODELS.USER + 's'),
            preparingDB.createUserByTemplate(1)
        ], function (err, results) {
            if (err) {
                return done(err)
            }

            done();
        });
    });

    it('User CREATE post', function (done) {

        agent
            .post('/signIn')
            .send(loginData)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err)
                }

                expect(res.body).to.have.property('success');
                expect(res.body.success).to.equal('Login successful');

                agent
                    .post('/post')
                    .send(postData)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }

                        expect(res.body).not.to.empty;

                        done();
                    });
            });
    });

    it('User GET lift of post', function (done) {

        agent
            .post('/signIn')
            .send(loginData)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err)
                }

                expect(res.body).to.have.property('success');
                expect(res.body.success).to.equal('Login successful');

                agent
                    .get('/post/search')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }

                        expect(res.body).to.instanceof(Array);
                        expect(res.body).not.to.empty;

                        postId = res.body[0]._id;

                        console.log(res.body);
                        done();
                    });
            });
    });

    it('User GET post by id', function (done) {

        agent
            .post('/signIn')
            .send(loginData)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err)
                }

                expect(res.body).to.have.property('success');
                expect(res.body.success).to.equal('Login successful');

                agent
                    .get('/post/' + postId)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }

                        expect(res.body).not.to.empty;

                        done();
                    });
            });
    });

    it('User DELETE post by id', function (done) {

        agent
            .post('/signIn')
            .send(loginData)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err)
                }

                expect(res.body).to.have.property('success');
                expect(res.body.success).to.equal('Login successful');

                agent
                    .delete('/post/' + postId)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }

                        expect(res.body).to.have.property('success');
                        expect(res.body.success).to.equal('Delete');

                        done();
                    });
            });
    });

});