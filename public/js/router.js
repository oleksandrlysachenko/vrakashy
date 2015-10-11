define([
    'collections/users',
    'views/users',
    'views/singUp',
    'views/createPost'
], function(UserCollection, UserView, SingUpView, CreatePostView){
    var Router = Backbone.Router.extend({

        routes: {
            "singUp": "singUp",
            "users": "users",
            "user/:id" : "user",
            "user/:id/posts" : "userPosts",
            "posts": "posts",
            "createPost" : "createPost",
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

        userPosts : function(id){
        },

        posts: function(){
            alert('Posts');
        },

        createPost : function(){
            var View = new CreatePostView();
            return View
        },

        any: function(){
            alert('404');
        }
    });

    return Router;
});