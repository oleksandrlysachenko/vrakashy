var User = function(app){
    var _User = app.get('PostGre').Models.User;

    this.create = function (req, res, next) {
        var body = req.body;
        var user = new _User(body);

        user
            .save(body)
            .asCallback(function (err, user) {
            if (err) {return next(err); }
            res.status(200).send(user);
        });
    };

    this.auth = function(req,res,next){
        if (true) {
            next();
        } else {
            res.status(401).send('must be authorized');
            next('must be authorized');
        }
    };

    this.roleCheck = function(req,res,next){ // admins
        if (true) {
            next();
        } else {
            res.status(403).send('you don`t have permissions');
            next('you don`t have permissions')
        }
    };

    this.view = function(req, res, next){
        var id = req.params.id;

        _User
            .forge({id: id})
            .fetch({withRelated:['friends_id']})
            .asCallback(function (err,user) {
                if (err){return next(err)}
                res.status(200).send(user);
            });
    };

    this.delete = function(req,res,next){
        var id = req.params.id;

        _User
            .forge({id: id})
            .destroy()
            .asCallback(function(err, response){
            if (err){ return next(err); }
            res.status(200).send('delete user: ' + id);
        });
    };

    this.edit = function(req,res,next){
        var id = req.params.id;

        _User
            .forge({id: id})
            .fetch()
            .asCallback(function (err,user) {
                if (err){return next(err)}
                res.status(200).send(user);
            });
    };

    this.update = function(req,res,next){
        var id = req.params.id;
        var body = req.body;

        _User
            .forge({id: id})
            .fetch()
            .then(function(user){
                user.save(body)
                    .asCallback(function(err,user){
                        if (err){ return next(err)}
                        res.status(200).send(user);
                    });

            })
    };

    this.friends = function(req,res,next){
        var id = req.params.id;

        _User
            .forge({id: id})
            .fetch({column:'friends_id'})
            .asCallback(function(err,response){
            if (err){ return next(err);}
            res.status(200).send(response);
        });
    };

    this.friendsAdd = function(req,res,next){
        var id = req.params.id;
        var idAdd = req.query.idAdd;

        _User
            .forge({id: id})
            .fetch()
            .then(function(user){
                var result = user.toJSON();
                var test = result.friends_id;

                if (test){test.push(idAdd)}
                else {test = [idAdd]}
                user.save({friends_id: test})
                    .asCallback(function(err,result){
                        if (err) {return next(err);}
                        res.status(200).send(result);
                    });
            })
    };

    this.friendsDelete = function(req,res,next){
        var id = req.params.id;
        var idDelete = req.query.idDelete;

        _User
            .forge({id: id})
            .fetch()
            .then(function(user){
                var result = user.toJSON();
                var test = result.friends_id;

                for (var i= 0; test.length >= i+1;) {
                    if (test[i] == idDelete) {
                        test.splice(i,1);
                        break;
                    }
                    i++;
                }
                user.save({post_id: test})
                    .asCallback(function(err,result){
                        if (err) {return next(err);}
                        res.status(200).send(result);
                    });
            })
    };

    this.getAll = function(req,res,next){
        _User
            .forge()
            .fetchAll()
            .asCallback(function (err, response) {
                if (err) { return next(err); }
                res.status(200).send(response);
            });
    };

    this.getPosts = function(req,res,next){
        var id = req.params.id;

        _User
            .forge({id:id})
            .fetch({})
            .asCallback(function(err,user){
                var result = user.toJSON();
                if (err){return next(err)}
                res.status(200).send(result.post_id);
            });
    }
};

module.exports = User;
