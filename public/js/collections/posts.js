define(['models/post'], function(Model){
    var Collection = Backbone.Collection.extend({
        model: Model,

        url: '/post/'
    });

    return Collection;
});