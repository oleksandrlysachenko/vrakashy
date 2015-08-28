module.exports = function(app){
    var bodyParser = require('body-parser');
    var userRouter = require('./user.js');

    app.use(bodyParser.json());
    app.use('/users',userRouter);
};
/*
--------------------------
 feed/
 login/
 singup/
 users/
--------------------------
 /users/:login
 /users/:login/settings
 /users/:login/settings/update
 /users/:login/add_friends * активно якщо коричтувач не є нашим френдом
 /users/:login/friends
 /users/:login/friends/:friends_login/delete
 /users/:login/delete * for admins
--------------------------
 /wall/:wall_id
 /wall/:wall_id/delete
 /wall/create
--------------------------
==========================
 /cp/users
 /cp/users/:login/delete
 /cp/users/:login/settings
 /cp/users/:login/settings/update
 /cp/posts/:id/delete
--------------------------
*/

