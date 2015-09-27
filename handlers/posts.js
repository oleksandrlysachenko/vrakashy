var Posts = function(app) {
    var _User = app.get('PostGre').Models.User;
    var _Post = app.get('PostGre').Models.Post;


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

    this.viewAll = function(req,res,next){
        _Post
            .forge()
            .fetchAll()
            .asCallback(function (err, response) {
                if (err) { return next(err); }
                res.status(200).send(response);
            });
    };

    this.createPost = function(req,res,next) {
        var body = req.body;
        var post = new _Post(body);

        post.save(body)
            .then(function(post) {
                _User
                    .forge({id: body.author_id})
                    .fetch()
                    .then(function (user) {
                        var result = user.toJSON();
                        var test = result.post_id;

                        if (test) {
                            test.push(post.id)
                        }
                        else {
                            test = [post.id]
                        }
                        user.save({post_id: test})
                    })
                    .asCallback(function (err, response) {
                        if (err) {
                            return next(err)
                        }
                        res.status(200).send(post)
                    })
            })
    };

    this.viewPost = function(req,res,next) {
        var postId = req.params.postId;

        _Post
            .forge({id:postId})
            .fetch({withRelated: ['author_id']})
            .asCallback(function(err,response){
                if (err) {return next(err)}
                res.status(200).send(response);
        });
    };

    this.delete = function(req,res,next) {
        var postId = req.params.postId;

        _Post
            .forge({id:postId})
            .destroy()
            .asCallback(function(err,user) {
                        res.status(200).send(user);
            })
    }
};
module.exports = Posts;