var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/*var CounterSchema = Schema({
    _id : {type: Number, required: true},
    seq : {type: Number, default: 1}
}, {collection: 'Counter'});*/
var UserSchema = Schema({
    //_id : Number,
    email: {type:String, default: 'example@example.com'},
    password: String,
    user: String,
    name: {
        first: {type: String, default: 'First'},
        last: {type: String, default: 'Last'}
    },
    dateOfBirth: {},
    friends: [{type: Number, ref: 'user'}],
    posts: [{type: Number, ref: 'post'}],
    userStatus: {type: String, default: 'User'}
}, {collection: 'User', version: false});

mongoose.schemas = {};

/*mongoose.schemas.Counter = CounterSchema;
var Counter = mongoose.model('Counter', CounterSchema);
UserSchema.pre('save',function(next){
    var doc = this;
    Counter.findByIdAndUpdate({_id : 'entityId'},{$inc:{seq:1}}, function(err,counter){
        if(err) {return next(err)}
        doc._id = counter.seq;

    });
    next()
});*/
mongoose.schemas.User = UserSchema;
