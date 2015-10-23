define([
    'views/main',
    'views/users',
    'views/user',
    'views/posts',
    'views/post',
    'views/addPost',
    'views/login',
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
            "post(/:id)" : "addPost",
            "login" : "login",
            "*any": "any"
        },

        root: function(){
            var View = new MainView();
            return View
        },

        singUp : function(){

         /*   var session = new Session();
            var renderView = function(){

                if (!session.session.id) {console.log('OK!')}
                var View = new SingUpView();
                return View
            };
            session.fetch({reset: true});
            session.bind('reset', renderView);
            console.log(session); */

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
            var collection = new PostsCollection;
            var renderView = function(){
                var view = new PostsView({
                    collection: collection
                });
            };
            collection.fetch({reset: true});
            collection.bind('reset', renderView)


        },

        addPost: function(idPost){
            if (!idPost) {
                var View = new AddPostView();
                return View
            }
            else {
                var Model = new PostModel({_id : idPost});
                Model.fetch({
                    success: function(model){
                        var view = new PostView(model.toJSON());
                    }
                })
            }
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