/**
 * Created by lenovo on 1/18/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studschema = new Schema({
    name:  String,
    addr: String,
    email :String,

});

module.exports = mongoose.model('Stud', studschema);