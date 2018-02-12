const mongoose= require('mongoose');
const schema= mongoose.Schema;
mongoose.Promise = require('bluebird');

var mySchema= new schema({
    fruitname: String,
    studentname : String
});

var poll = mongoose.model("poll", mySchema);

module.exports = poll;