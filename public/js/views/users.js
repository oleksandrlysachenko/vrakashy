define([
    'models/user',
    'views/singUp',
    'text!templates/users.html'
], function(
    UserModel,
    singUpView,
    userTemplate){
    var View = Backbone.View.extend({
        el: '#content',
        template: _.template(userTemplate),

        events: {
            'click #createUser' : 'createUser',
            'click #postListBtn' : 'postListBtn',
            'click .currentUser': 'viewUser',
            'click #myPage' : 'myPage',
            'click #loginBtn' : 'login'
        },

        initialize: function(optins){
            this.auth();
            this.render(optins);
        },

        auth: function() {
                var _User = new UserModel();
                _User.fetch({
                    success: function (model, response) {
                        $('.pageUser').attr('id', response._id);
                        if (response.userStatus == 'User') {
                            $('.admin').remove();
                        }
                    },
                    error: function(){
                        $('p').hide();
                        $('.createUser-UI').text('Sing Up');
                        $('.myPage-UI').text('Login');
                    }
                })
        },

        createUser: function(e){
            return new singUpView();
        },

        myPage : function() {
            var id = $('.pageUser').attr('id');
            var url = 'user/' + id;
            Backbone.history.fragment = '';
            Backbone.history.navigate(url, {trigger: true});
        },

        postListBtn: function(){
            Backbone.history.fragment = '';
            Backbone.history.navigate('#posts', {trigger: true});
        },

        viewUser: function(e){
            var targetEl = $(e.target);
            var tr = targetEl.closest('.currentUser');
            var id = tr.attr('id');
            var User = new UserModel({_id: id});

            User.fetch({
                success: function(model){
                    var url = model.urlRoot()+'/'+ model.id;
                    model = model.toJSON();
                    Backbone.history.fragment = '';
                    Backbone.history.navigate(url, {trigger: true});
                },
                error: function(){
                    alert('Please Log In!');
                }
            });
        },

        render: function(optins){
            var collection = optins.collection.toJSON();
            this.$el.html(this.template({users: collection}));
            return this;
        }
    });

    return View;
});