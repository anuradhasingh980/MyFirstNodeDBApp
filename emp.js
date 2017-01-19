/**
 * Created by lenovo on 1/19/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deptschema = new Schema({
    deptname:  String,

});

module.exports = mongoose.model('Dept',deptschema);