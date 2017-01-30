/**
 * Created by lenovo on 1/30/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({
    name: String,
    password: String,
    mobile :String,
    admin: Boolean
}));