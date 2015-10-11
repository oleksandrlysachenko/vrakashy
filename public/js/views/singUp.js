define([
    //'models/post',
    'text!templates/singUp.html'
], function(singUpTemplate){
    var View = Backbone.View.extend({
        el: '#content',
        template: _.template(singUpTemplate),
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