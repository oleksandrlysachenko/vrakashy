define([], function(){
    var Model = Backbone.Model.extend({
        idAttribute: '_id',
        attributes: 'session:{userID}',
        url: function(){
            return '/session';
        }
    });

    return Model;
});