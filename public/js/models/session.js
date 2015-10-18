define([], function(){
    var Model = Backbone.Model.extend({

        url: function(){
            return '/session';
        }
    });

    return Model;
});