define([
    'models/post',
    'models/user',
    'text!templates/post.html'
], function(
    Post,
    ModelUser,
    postTemplate ) {
    var View = Backbone.View.extend({
        el: '#content',
        template: _.template(postTemplate),

        events: {
            'click #deletePostBtn' : 'deletePost',
            'click #backBtn' : 'back'
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
                    if ((response.userStatus == 'User') && (response._id != optins.author._id)) {
                        $('.admin').remove();
                    }
                }
            })
        },

        back: function(){
            Backbone.history.fragment = '';
            Backbone.history.navigate('#posts', {trigger: true});
        },

        deletePost: function(){
            var targetEl = $('.idP').attr('id');
            var id = targetEl;

            var post = new Post({_id:id});

            post.destroy({
                success: function(){
                    Backbone.history.fragment = '';
                    Backbone.history.navigate('#posts', {trigger: true});
                },
                error: function(){
                    alert('this');
                }});

        },

        render: function(model){
            this.$el.html(this.template(model));
            return this;
        }
    });

    return View;
});

