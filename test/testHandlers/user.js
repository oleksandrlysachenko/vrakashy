'use strict';

var request = require('supertest');
var expect = require('chai').expect;
var CONST = require('../../constants/index');
var USERS = require('../testHelpers/usersTemplate');
var async = require ('async');
var PreparingDB = require('./preparingDatabase');

var app = require('../../app');

describe('User functionality', function () {
    this.timeout(10000);

    var agent = request.agent(app);
    var userData = USERS.TEMP_USER;
    var loginData = USERS.TEMP_LOGIN_USER;
    var userGetById;
    var addToFriendsId;

    before(function (done) {
        this.timeout(4000);
        console.log('>>> before');

        var preparingDB = new PreparingDB();

        async.series([
            preparingDB.dropCollection(CONST.MODELS.USER + 's'),
            preparingDB.createUserByTemplate(3)
        ], function (err, results) {
            if (err) {
                return done(err)
            }

            done();
        });
    });

    it('User GET his profile', function (done) {

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
                    .get('/user')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }

                        expect(res.body).to.have.property('_id');
                        expect(res.body).to.have.property('profile');

                        done();
                    });
            });
    });

    it('User SET settings', function (done) {

        userData.profile.first = 'Jack';
        userData.profile.last = 'Black';

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
                    .put('/user/settings')
                    .send(userData)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }

                        expect(res.body).to.have.property('success');
                        expect(res.body.success).to.equal('Update');

                        agent
                            .get('/user')
                            .expect(200)
                            .end(function (err, res) {
                                if (err) {
                                    return done(err);
                                }

                                expect(res.body.profile.first).to.equal(userData.profile.first);
                                expect(res.body.profile.last).to.equal(userData.profile.last);

                                done();
                            });
                    });
            });
    });

    it('User GET list of all user', function (done) {

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
                    .get('/user/search')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }

                        console.log(res.body);

                        userGetById = res.body[0]._id;
                        addToFriendsId = res.body[1]._id;

                        done();
                    });
            });
    });

    it('User GET user by id', function (done) {

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
                    .get('/user/' + userGetById)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }

                        console.log(res.body);

                        done();
                    });
            });
    });

    it('User ADD to friends', function (done) {

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
                    .put('/user/friends?id=' + addToFriendsId)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }

                        console.log(res.body);

                        done();
                    });

            });
    });



    it('User GET list of all friends', function (done) {

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
                    .get('/user/friends')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }

                        console.log(res.body);

                        done();
                    });

            });
    });

});