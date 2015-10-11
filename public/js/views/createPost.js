define([
    //'models/post',
    'text!templates/createPost.html'
], function(createPostTemplate){
    var View = Backbone.View.extend({
        el: '#content',
        template: _.template(createPostTemplate),
        events: {
        },
        initialize: function(optins){
            this.render(optins);
        },
        render: function(optins){
            this.$el.html(this.template());
            return this;
        }
    });
    return View;
});