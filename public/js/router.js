define([
    'collections/users',
    'views/users',
    'views/singUp'
], function(UserCollection, UserView, SingUpView){
    var Router = Backbone.Router.extend({

        routes: {
            "singUp": "singUp",
            "users": "users",
            "user/:id" : "user",
            "posts": "posts",
            "*any": "any"
        },

        singUp : function(){
            var View = new SingUpView();
            return View
        },



        users: function(){
            var collection = new UserCollection();
            var renderView = function(){
                var view = new UserView({
                    collection: collection
                });
            };

            collection.fetch({reset: true});
            collection.bind('reset', renderView);
        },

        user: function(id){},

        posts: function(){
            alert('Posts');
        },

        any: function(){
            alert('404');
        }
    });

    return Router;
});