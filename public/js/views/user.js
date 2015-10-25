define([
    'models/user',
    'models/session',
    'views/addPost',
    'text!templates/user.html'
], function(
    User,
    ModelSession,
    AddPostView,
    userTemplate ) {
    var View = Backbone.View.extend({
        el: '#content',
        template: _.template(userTemplate),

        events: {
            'click #userListBtn' : 'userListBtn',
            'click #postsListBtn' : 'postsListBtn',
            'click #myPost' : 'myPost',
            'click #deleteBtn' : 'delete',
            'click #addPost' : 'addPost',
            'click #editBtn' : 'editUser',
            'click #logoutBtn' : 'logOut'
        },

        initialize: function(optins){
            this.auth(optins);
            this.render(optins);
        },

        auth: function(optins) {
            var _User = new User();
            _User.fetch({
                success: function (model, response) {
                    $('.pageUser').attr('id', response._id);
                    if (response.userStatus == 'User') {
                        $('.admin').remove();
                    }
                    if (optins._id != response._id) {
                        $('.addPost').remove();
                        $('.edit').remove();
                    }
                }
            })
        },

        userListBtn: function(e){
            Backbone.history.fragment = '';
            Backbone.history.navigate('#users', {trigger: true});
        },

        postsListBtn: function(){
            Backbone.history.fragment = '';
            Backbone.history.navigate('#posts', {trigger: true});
        },

        myPost: function(){
            var targetEl = $('.form__field').attr('id');
            var id = targetEl;
            var url = '#user/'+id+'/posts';
            this.undelegateEvents();
            Backbone.history.fragment = '';
            Backbone.history.navigate(url, {trigger: true});
        },

        logOut: function(){
            var targetEl = $('.form__field').attr('id');
            var id = targetEl;
            var Session = new ModelSession();
            Session.fetch({
                success: function(model,response){
                    $('.pageUser').attr('id','');
                    Backbone.history.fragment = '';
                    Backbone.history.navigate('#main', {trigger: true});
                }
            })
        },

        editUser: function(){
            var thisEl = this.$el;
            var targetEl = $('.form__field').attr('id');
            var id = targetEl;
            var data = {};
            var user = thisEl.find('#user').val();
            var email = thisEl.find('#email').val();
            var password = thisEl.find('#password').val();
            var firstName = thisEl.find('#first').val();
            var lastName = thisEl.find('#last').val();
            data = {
                _id: id,
                user: user,
                password: password,
                email: email ,
                firstName: firstName,
                lastName: lastName
            };
            var _user = new User(data);
            _user.save({}, {
                success: function(model){
                    Backbone.history.fragment = '';
                    Backbone.history.navigate('#users', {trigger: true});
                },
                error: function(response, xhr){
                    alert(response.status);
                }
            });
        },

        addPost: function(){
            var id = $('.pageUser').attr('id');
            var url = '#user/'+id+'/post';
            this.undelegateEvents();
            Backbone.history.fragment = '';
            Backbone.history.navigate(url, {trigger: true});
        },

        delete: function(e){
            var targetEl = $(e.target);
            var tr = targetEl.closest('div');
            var id = tr.attr('id');
            var user = new User({_id:id});

            user.destroy({
                success: function(){
                    Backbone.history.fragment = '';
                    Backbone.history.navigate('#users', {trigger: true});
                },
                error: function(){
                    alert('error');
                }});
            return
        },

        render: function(model){
            this.$el.html(this.template(model));
            return this;
        }
    });

    return View;
});
