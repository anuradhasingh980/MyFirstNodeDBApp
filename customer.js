/**
 * Created by lenovo on 2/6/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = mongoose.model('Customer', new Schema({
    name : String,
    parent:String,
    customerimg : String,

}));

