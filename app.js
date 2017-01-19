
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb'); // connect to our database
var Stud = require('./model/stud');
var Dept = require('./model/emp');
var Emp = require('./model/dept');
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api', router);

var server = app.listen(82, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

});


module.exports = app;

router.route('/studs')

    .post(function(req, res) {

        var stud = new Stud();
        stud.name = req.body.name;
        stud.addr = req.body.addr;
        stud.email = req.body.email;
        // save the bear and check for errors
        stud.save(function(err,data) {
            if (err)
                res.send(err);

            res.json({ message:  data});
        });
    })

    .get(function(req, res) {
        Stud.find(function(err, studs) {
            if (err)
                res.send(err);

            res.json(studs);
        });
    });

router.route('/studs/:stud_id')













// get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Stud.findById(req.params.stud_id, function(err, stud) {
            if (err)
                res.send(err);
            res.json(stud);
        });
    })

    .put(function(req, res) {

        // use our bear model to find the bear we want
        Stud.findById(req.params.stud_id, function(err, stud) {

            if (err)
                res.send(err);

            stud.name = req.body.name;
            stud.addr = req.body.addr;
            stud.email = req.body.email;


            // save the bear
            stud.save(function(err,data) {
                if (err)
                    res.send(err);

                res.json({ message: data });
            });

        });
    })

    .delete(function(req, res) {
        Stud.remove({
            _id: req.params.stud_id
        }, function(err, stud) {
            if (err)
                res.send(err);

            res.json({ message: stud });
        });
    });


router.route('/depts')
    .post(function(req, res) {

        var dept = new Dept();

        dept.deptname=req.body.deptname;
        dept.emp = req.body.emp;


        // save the bear and check for errors
        dept.save(function(err,data) {
            if (err)
                res.send(err);

            res.json({ message:  data});
        });
    })

    .get(function(req, res) {
        Dept.find(function(err, studs) {
            if (err)
                res.send(err);

            res.json(studs);
        });
    });

router.route('/emps')
    .post(function(req, res) {

        var emp = new Emp();

        emp.empname = req.body.deptname;


        // save the bear and check for errors
        emp.save(function(err,data) {
            if (err)
                res.send(err);

            res.json({ message:  data});
        });
    })
    .get(function(req, res) {
        Emp.find(function(err, studs) {
            if (err)
                res.send(err);

            res.json(studs);
        });
    })

router.route('/emps/:dept_id')

    .get(function(req, res) {
        Emp.find().populate('dept', 'deptname').exec(function (err, data) {

            if (err)
                res.send(err);
            else
                res.json(data);

        })
    })
