var User = function(res,req,next){
    this.create = function(req, res, next){
        res.status(200).send(req.body);
    };
    this.view = function(req, res, next){
        var login = req.params.login;
        res.status(200).send('request for user: ' + login);
    };
    this.delete = function(req,res,next){
        var login = req.params.login;
        res.status(200).send('delete user: ' + login);
    };
    this.edit = function(req,res,next){
        var login = req.params.login;
        res.status(200).send('user ' + login + ' request for settings');
    };
    this.update = function(req,res,next){
        var login = req.params.login;
        res.status(200).send('user ' + login + ' was update');
    };
    this.friends = function(req,res,next){
        var login = req.params.login;
        res.status(200).send('user ' + login + ' friends list');
    };
    this.friendsAdd = function(req,res,next){
        var login = req.params.login;
        var loginAdd = req.params.loginAdd;
        res.status(200).send('user ' + login + ' add ' + loginAdd +
        ' to friends list');
    };
    this.friendsDelete = function(req,res,next){
        var login = req.params.login;
        var loginDelete = req.params.loginDelete;
        res.status(200).send('user ' + login + ' delete ' + loginDelete +
        ' from friends list');
    }
};

module.exports = User;
