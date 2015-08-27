var User = function(){
    this.create = function(req, res, next){
        res.status(200).send(req.body);
    } ;

    this.updateUser = function(req, res, next){
        var login = req.params.login;
        var weight = req.params.weight;

        res.status(200).send({login: login, weight: weight});
    };

    this.getAll = function(req, res, next){
        console.log(req.myVar);
        res.status(200).send(req.ip);
    }
};

module.exports = User;
