/**
 * Created by lenovo on 1/18/2017.
 */
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var  bodyParser = require('body-parser'); //parses information from POST

//var db = require('./core/db');
var routes = require('./routes/studs');
var mongoose =require('mongoose')
var stud=require('./model/stud');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

//  app.get('/',function(req, res, next) {
//         //retrieve all blobs from Monogo
//         mongoose.model('stud').find({}, function (err, data) {
//             if (err) {
//                 return res.send(err);
//             } else {
//                 res.send(data)
//          }
//         });
//     });
// var server = app.listen(82, function () {
//
//     var host = server.address().address
//     var port = server.address().port
//
//     console.log("Example app listening at http://%s:%s", host, port)
//
// });
// var MongoClient = require('mongodb').MongoClient;
//
// // Connect to the db
MongoClient.connect("mongodb://localhost:27017/mydb", function (err, db) {

    db.collection('Persons', function (err, collection) {

        collection.insert({ id: 1, firstName: 'Steve', lastName: 'Jobs' });
        collection.insert({ id: 2, firstName: 'Bill', lastName: 'Gates' });
        collection.insert({ id: 3, firstName: 'James', lastName: 'Bond' });



        db.collection('Persons').count(function (err, count) {
            if (err) throw err;

            console.log('Total Rows: ' + count);
        });
    });

});



