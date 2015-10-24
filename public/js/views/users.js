define([
    'models/user',
    'views/singUp',
    'text!templates/users.html'
], function(UserModel,singUpView,userTemplate){
    var View = Backbone.View.extend({
        el: '#content',
        template: _.template(userTemplate),

        events: {
            'click #createUser' : 'createUser',
            'click #back' : 'back',
            'click .currentUser': 'viewUser'
        },

        initialize: function(optins){
            this.render(optins);
        },

        createUser: function(e){
            return new singUpView();
        },

        back: function(){
            this.undelegateEvents();
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