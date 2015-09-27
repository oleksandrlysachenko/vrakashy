module.exports = function (postGre) {

    var UserModel = postGre.Model.extend({
        tableName: 'users'


    });

    return UserModel;
};