/**
 * Created by lenovo on 2/1/2017.
 */
var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var settings = require('./public/setting');
var multer  = require('multer')
var Profile = require('./public/model/profile');
var State = require('./public/model/state');
var City = require('./public/model/city');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
mongoose.connect('mongodb://localhost:27017/test');
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.get('/', function(req, res) {
    res.sendFile( __dirname + "/views/" + "state.html");
});
var server = app.listen(81, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

});
var storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, './uploads');
    },
    filename: function (request, file, callback) {
        console.log(file);
        var filename = file.originalname;
        request.body.profileimg = filename;
        callback(null,file.originalname)
    }
});
var upload = multer({storage: storage}).single('profileimg');
app.post('/api/profile', upload,function(req, res) {
    Profile.create({
        name : req.body.name,
        email: req.body.email,
        gender : req.body.gender,
        dob : req.body.dob,
        stateid : mongoose.Types.ObjectId(req.body.stateid),
        cityid : mongoose.Types.ObjectId(req.body.cityid),
        profileimg : req.body.profileimg,
        status : req.body.status
    }, function(err) {
        if (err)
            res.send(err);

        Profile.find(function(err, profiles) {
            res.json(profiles);
        });
    });

});
app.put('/api/profile/:pro_id', upload,function(req, res) {

    Profile.findById(req.params.pro_id, function (err, profile) {

        if (err)
            res.send(err);
        res.json(profile)

        profile.name = req.body.name
        profile.email = req.body.email
        profile.gender = req.body.gender
        profile.dob = req.body.dob
        profile.stateid = mongoose.Types.ObjectId(req.body.stateid)
        profile.cityid = mongoose.Types.ObjectId(req.body.cityid)
        profile.profileimg = req.body.profileimg
        profile.status = req.body.status
    }, function(err) {
        if (err)
            res.send(err);

        Profile.find(function(err, profiles) {
            res.json(profiles);
        });
    });

});
app.delete('/api/profile/:pro_id', function(req, res) {
    Profile.remove({
        _id : req.params.pro_id
    }, function(err, profile) {
        if (err)
            res.send(err);
        Product.find(function(err, profile) {
            if (err)
                res.send(err)
            res.json(profile);
        });
    });
});
app.get('/api/profile',function (req,res) {
    Profile.find(function(err,profile) {
        if (err)
            res.send(err)

        res.json(profile);
    });

})
app.post('/api/state', function(req, res) {
    State.create({
        statename : req.body.statename
    }, function(err) {
        if (err)
            res.send(err);

        State.find(function(err, states) {
            res.json(states);
        });
    });

});
app.post('/api/city', function(req, res) {
    City.create({
        cityname : req.body.cityname,
        stateid : mongoose.Types.ObjectId(req.body.stateid)
    }, function(err) {
        if (err)
            res.send(err);

        City.find(function(err, cities) {
            res.json(cities);
        });
    });

});
app.get('/api/state',function (req,res) {
    State.find(function(err,states) {
        if (err)
            res.send(err)

        res.json(states);
    });

})
app.get('/api/city',function (req,res) {
    City.find(function(err,city) {
        if (err)
            res.send(err)

        res.json(city);
    });

})
