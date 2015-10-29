define([
    'views/main',
    'views/users',
    'views/user',
    'views/posts',
    'views/post',
    'views/addPost',
    'views/login',
    'views/userPosts',
    'views/singUp',
    'models/user',
    'models/post',
    'collections/users',
    'collections/posts'
], function(
    MainView,
    UsersView,
    UserView,
    PostsView,
    PostView,
    AddPostView,
    ViewLogin,
    ViewUserPosts,
    ViewSingUp,
    UserModel,
    PostModel,
    UsersCollection,
    PostsCollection) {
    var Router = Backbone.Router.extend({

        routes: {
            "" : "root",
            "singUp": "singUp",
            "users": "users",
            "user/:id" : "user",
            "user/:id/posts" : "userPosts",
            "user/:id/post" : "userAddPost",
            "posts": "posts",
            "post/:id" : "viewPost",
            "login" : "login",
            "*any": "any"
        },

        root: function(){
            var View = new MainView();
            return View
        },

        singUp : function(){
            var self = this;
            if (self.renderView){
                self.renderView.undelegateEvents();
            }
            self.renderView = new ViewSingUp();
        },

        users: function() {
            var self = this;
            var collection = new UsersCollection();
            collection.unbind();
            var renderView = function () {
                if (self.usersView) {
                    self.usersView.undelegateEvents();
                }
                self.usersView = new UsersView({
                    collection: collection
                });
                return self;
            };
            collection.url = 'user/all';
            collection.fetch({reset: true});
            collection.bind('reset', renderView);
        },

        posts: function(){
            var self = this;
            var collection = new PostsCollection;
            collection.unbind();
            var renderView = function(){
                if (self.postsView) {
                    self.postsView.undelegateEvents();
                }
                self.postsView = new PostsView({
                    collection: collection
                });
                return self;
            };
            collection.fetch({reset: true});
            collection.bind('reset', renderView)


        },

        viewPost: function(idPost){
                var Model = new PostModel({_id : idPost});
                Model.fetch({
                    success: function(model){
                        var view = new PostView(model.toJSON());
                    }
                })
        },

        user: function(userId){
            var Model = new UserModel({_id : userId});
            Model.fetch({
                success:function(model,response){
                    var result = response;
                    var view = new UserView(result);
                },
                error: function(err,xhr){
                    Backbone.history.fragment = '';
                    Backbone.history.navigate('#login', {trigger: true});
                }
            });
        },

        userPosts : function(id){
            var self = this;
            var collection = new PostsCollection;
            collection.unbind();
            collection.url = 'user/'+id+'/posts';
            var renderView = function(){
                if (self.postsView) {
                    self.postsView.undelegateEvents();
                }
                self.postsView = new ViewUserPosts({
                    collection: collection,
                    id: id
                });
                return self;
            };
            collection.fetch({reset: true});
            collection.bind('reset', renderView)
        },

        userAddPost: function(userID){
            var self = this;
            if (self.renderView){
                self.renderView.undelegateEvents();
              }
            self.renderView = new AddPostView(userID);
            // return self;
            //var View = new AddPostView(userID);
            //return View
        },

        login: function(){
            var View = new ViewLogin();
            return View
        },

        any: function(){
            var View = new MainView();
            return View
        },

        initialize: function(){
        }
    });

    return Router;
});