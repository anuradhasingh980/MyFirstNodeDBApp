/**
 * Created by lenovo on 1/19/2017.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var empschema = new Schema({
    empname:  String,
    dept:[{ type:Schema.Types.ObjectId,ref:'Dept' }]
});

module.exports = mongoose.model('Emp',empschema);