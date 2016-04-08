define(['router'], function(Router){
    function init() {
        var router = new Router();
        var fragment = Backbone.history.fragment;
        var url = window.location.hash;

        authorized(function (err, res) {
            runApplication(err, res);
        });

        function authorized(callback) {
            $.ajax({
                url: '/authorized',
                method: 'GET',
                success: function (res) {
                    return callback(null, res);
                },
                error: function (err) {
                    return callback(err);
                }
            });
        }

        function runApplication(err, res) {
            Backbone.history.start({silent: true});

            if (err && url!== '#signUp') {
                Backbone.history.fragment = '#';
                return Backbone.history.navigate('signIn', {trigger: true});
            }

            if (fragment) {
                Backbone.history.fragment = '#';
            } else {
                Backbone.history.fragment = '#';
                Backbone.history.navigate(url, {trigger: true});
            }
        }

    }

    return {
        init: init
    }
});