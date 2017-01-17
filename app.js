/**
 * Created by lenovo on 1/17/2017.
 */


var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var settings = require('./settings');


// Controller declaration
// STRAT
var routes = require('./routes/student');
//END

// Model declaration
// STRAT
var userModel = require('./model/studtbl.js');
//END

var app = express();
var server = require('http').Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());




app.post('/registerStudent', function (req, res,next) {
    userModel.registerStudent(req.body.name, req.body.email, req.body.address, function (err, data) {
        if (err) {
            next(err);
            return;
        }
        else {
            res.send(200, data)
        }
    });
});
app.get('/student', function (req, res, next) {
    //TODO get all country list
    //if is successful then return HTTP status as 200 with new country list JSON object other wise return HTTP status as 500 with valid error meassge
    userModel.getStudentProfile(function (data, err) {
        if(err){
            return res.send({error: err});
        }

        return res.send({data: data});
          //return res.send(data);
          //return  res.send(data, data);
            //console.log(data)

    });
});

app.put('/student/:id', function(req, res,next) {

    userModel.updateStudent(req.body.name, req.body.email,req.body.address,req.params.id,function (err, data) {
        if (err) {
            return res.send({error: err});
        }

        else {
            return res.send({data:data})

        }
    });
});

app.delete('/delstud/:id', function(req, res,next) {

    userModel.deleteStudent(req.params.id,function (err, data) {
        if (err) {
            return res.send({error: err});
        }

        else {
            return res.send({data:data})

        }
    });
});



app.post('/Addstudent', function(req, res,next) {

    userModel.insertStudent('',req.body.name, req.body.email,req.body.address,function (err, data) {
        if (err) {
            return res.send({error: err});
        }

        else {
            //var stringify = JSON.stringify(data)
            //return (res.send({data:stringify}));
            return res.send({data:data});
        }
    });
});








var server = app.listen(81, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

});

