define(['models/user'], function (Model) {
    var Collection = Backbone.Collection.extend({
        model: Model,
        url: '/user/search'
    });

    return Collection;
});