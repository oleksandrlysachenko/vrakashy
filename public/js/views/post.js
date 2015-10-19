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
        },

        initialize: function(optins){
            this.render(optins);
        },

        back: function(){
            Backbone.history.fragment = '';
            Backbone.history.navigate('#users', {trigger: true});
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

    /*    delete: function(e){
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
        }, */

        render: function(model){
            this.$el.html(this.template(model));
            return this;
        }
    });

    return View;
});

