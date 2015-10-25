define([
    'models/post',
    'models/user',
    'text!templates/posts.html'
], function(
    Post,
    ModelUser,
    postsTemplate
){
    var View = Backbone.View.extend({
        el: '#content',
        template: _.template(postsTemplate),

        events: {
            'click #userListBtn' : 'usersList',
            'click .currentPost' : 'd',
            'click #myPageBtn' : 'myPage',
            'click #singUpBtn' : 'singUp'
        },

        initialize: function(optins){
            this.auth(optins);
            this.render(optins);
        },

        auth: function(optins) {
            var _User = new ModelUser();
            _User.fetch({
                success: function (model, response) {
                    $('.pageUser').attr('id', response._id);
                },
                error: function(){
                    $('p').hide();
                    $('#navigate').append('<button id="singUpBtn">Sing Up</button>');
                    $('.myPage-UI').text('Login');
                }
            })
        },

        singUp: function(){
            Backbone.history.fragment = '';
            Backbone.history.navigate('singUp', {trigger: true});
        },

        myPage: function(){
            var id = $('.pageUser').attr('id');
            var url = 'user/' + id;
            Backbone.history.fragment = '';
            Backbone.history.navigate(url, {trigger: true});
        },

        d: function(e){
                var targetEl = $(e.target);
                var tr = targetEl.closest('.currentPost');
                var id = tr.attr('id');
                console.log(id);
            var post = new Post({_id :id});
            post.fetch({
                success: function(model){
                    var url = model.urlRoot()+'/'+ model.id;
                    model = model.toJSON();
                    Backbone.history.fragment = '';
                    Backbone.history.navigate(url, {trigger: true});
                },
                error: function(){
                    alert('Please log in!');
                }
            });
        },

        usersList: function(){
            Backbone.history.fragment = '';
            Backbone.history.navigate('#users', {trigger: true});
        },

        render: function(optins){
            var collection = optins.collection.toJSON();
            console.log(collection);
            this.$el.html(this.template({posts: collection}));
            return this;
        }
    });

    return View;
});