define([
    'text!templates/navBar.html'
], function(
    ModelNavBar,
    TemplateNavBar
) {
    var ViewNavBar = Backbone.View.extend({
        el: '#navBar',
        template: _.template(TemplateNavBar),
        events: {
            'click #signOutBtn' : 'signOut'
        },

        initialize: function(){

            this.render();
        },

        signOut: function() {
            $.ajax({
                url: '/signOut',
                method: 'POST',
                success: function (res) {
                    alert(res.success);

                    Backbone.history.fragment = '';
                    Backbone.history.navigate('#signIn', {trigger: true});
                },
                error: function (err) {
                    alert(err.responseJSON.error);
                }
            })
        },

        render: function(){
            this.$el.html(this.template());

            return this;
        }
    });

    return ViewNavBar;
});
