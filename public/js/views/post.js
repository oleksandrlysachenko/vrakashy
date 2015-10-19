define([
    'models/post',
    'text!templates/post.html'
], function(
    Post,
    postTemplate ) {
    var View = Backbone.View.extend({
        el: '#content',
        template: _.template(postTemplate),

        events: {
            'click #deletePostBtn' : 'deletePost',
            'click #backBtn' : 'back'
        },

        initialize: function(optins){
            this.render(optins);
        },

        back: function(){
            Backbone.history.fragment = '';
            Backbone.history.navigate('#posts', {trigger: true});
        },

  /*      addPost: function(e){
            var self = this;
            var targetEl = $(e.target);
            var tr = targetEl.closest('div');
            var id = tr.attr('id');
            //    var View = new AddPostView(id);
            //      return new AddPostView(id);
            if (self.adView) {
                self.adView.undelegateEvents();
            } else{
                self.adView = new AddPostView(id);
                return self; }

        }, */

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

