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
            this.render(optins);
        },

        userListBtn: function(){
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
            Backbone.history.fragment = '';
            Backbone.history.navigate(url, {trigger: true});
        },

        logOut: function(){
            var targetEl = $('.form__field').attr('id');
            var id = targetEl;
            var Session = new ModelSession();
            Session.fetch({
                success: function(model,response){
                    Backbone.history.fragment = '';
                    Backbone.history.navigate('#login', {trigger: true});
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

        addPost: function(e){
            var self = this;
            var targetEl = $(e.target);
            var tr = targetEl.closest('div');
            var id = tr.attr('id');
                if (self.adView) {
                    self.adView.undelegateEvents();
                } else{
                self.adView = new AddPostView(id);
                return self; }

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
