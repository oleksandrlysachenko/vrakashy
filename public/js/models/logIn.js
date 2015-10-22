define([], function(){
    var Model = Backbone.Model.extend({
        idAttribute: '_id',

        urlRoot: function(){
            return '/user/login';
        }
    });

    return Model;
});
