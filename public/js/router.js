define([
    'views/main',
    'views/users',
    'views/user',
    'views/posts',
    'views/post',
    'views/addPost',
    'views/login',
    'views/userPosts',
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
            var View = new SingUpView();
            return View
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
            collection.fetch({reset: true});
            collection.bind('reset', renderView);
        },

        posts: function(){
            var self = this;
            var collection = new PostsCollection;
            collection.unbind();
            var renderView = function(){
                if (self.usersView) {
                    self.usersView.undelegateEvents();
                }
                self.usersView = new PostsView({
                    collection: collection
                });
             //   return self;
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
                success:function(model){
                    var view = new UserView(model.toJSON());
                },
                error: function(err,xhr){
                    Backbone.history.fragment = '';
                    Backbone.history.navigate('#login', {trigger: true});
                }
            });
        },

        userPosts : function(id){
            var collection = new PostsCollection;
            collection.url = 'user/'+id+'/posts';
            var renderView = function(){
                var view = new ViewUserPosts({
                    collection: collection,
                    id: id
                });
            };
            collection.fetch({reset: true});
            collection.bind('reset', renderView)
        },

        createPost : function(){
            var View = new CreatePostView();
            return View
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
            /*  var a = new Session();
            console.log(cookie.sessionID);
            a.fetch({
                success: function(model) {
                    console.log(model);
                    var result = JSON.stringify(model);
                    console.log('resul: '+result);
                    //if (!result.session._id) {console.log(true)}
                }
                ,
                error: function(err){
                    console.log(err)
                }
            }); */

            //var View = new SingUpView();
            //return View

        }
    });

    return Router;
});