var User = function(){
    this.create = function(req, res, next){
        res.status(200).send(req.body);
    } ;

    this.updateUser = function(req, res, next){
        var login = req.params.login;
        var weight = req.params.weight;

        res.status(200).send({login: login, weight: weight});
    };

    this.getUser = function(req, res, next){
        var login = req.params.login;
        console.log('user request');
        res.status(200).send({login: login});
    };
    this.getUserSettings = function(req,res,next){
        var login =req.params.login;
        console.log('user request settings');
        res.status(200).send({login: login, settings: 'settings info'});
    }
};

module.exports = User;
