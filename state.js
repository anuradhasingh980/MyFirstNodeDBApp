/**
 * Created by lenovo on 2/1/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = mongoose.model('State', new Schema({
    statename : String
}));