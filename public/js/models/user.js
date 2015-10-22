define([], function(){
    var Model = Backbone.Model.extend({
        idAttribute: '_id',
        user: 'user',
        password: 'password',

        urlRoot: function(){
            return '/user';
        }
    });

    return Model;
});