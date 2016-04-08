define([],function(){
    var SignOutView = Backbone.View.extend({
        events: {
        },

        initialize: function(){
            this.signOut();
        },

        signOut: function(e) {
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
            return this;
        }
    });

    return SignOutView;
});

