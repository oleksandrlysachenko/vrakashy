define([
    'text!templates/navBar.html'
], function(
    TemplateNavBar
) {
    var ViewNavBar = Backbone.View.extend({
        el: '#navBar',
        template: _.template(TemplateNavBar),
        events: {
            'click .navBar' : 'navigateByDataHash',
            'click #signOutBtn' : 'signOut'
        },

        initialize: function(){
            console.log('Initialize: navBar View');

            this.render();
        },

        navigateByDataHash: function (e) {
            var targetEl = $(e.target);
            var hash = targetEl.data('hash');

            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();

            Backbone.history.fragment = '';
            Backbone.history.navigate(hash, {trigger: true});

        },

        render: function(){
            console.log('Render: navBar View');

            this.$el.html(this.template());

            return this;
        }
    });

    return ViewNavBar;
});
