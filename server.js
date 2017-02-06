/**
 * Created by lenovo on 2/6/2017.
 */
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var multer = require('multer')
var Customer = require('./public/model/customer');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
mongoose.connect('mongodb://localhost:27017/test');
app.use(cookieParser());
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(express.static(__dirname + '/public'));


app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/" + "index.html");
});
// app.set('views', __dirname + '/views/');
var server = app.listen(81, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

});

var storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null,'./public/uploads');
    },
    filename: function (request, file, callback) {
        console.log(file);
        var filename = file.originalname;
        request.body.customerimg = filename;
        callback(null, file.originalname)
    }
});
var upload = multer({storage: storage}).single('customerimg');
app.post('/api/customer',upload,function (req,res) {

    Customer.create({
        name: req.body.name,
        parent:req.body.parent,
        customerimg: req.body.customerimg,
    }, function (err) {
        if (err)
            res.send(err);

        Customer.find(function (err, customers) {
            res.json(customers);
        });
    });

})
app.get('/api/customer',function (req,res) {
    Customer.find(function (err, customers) {
        res.json(customers);
    });
})

app.delete('/api/customer/:cust_id',function (req,res) {

        Customer.remove({
            _id: req.params.cust_id
        }, function (err) {
            if (err)
                res.send(err);
        });
    });

app.put('/api/customer/:cust_id', upload, function (req, res) {

    Customer.findById(req.params.cust_id, function (err, customer) {

        if (err)
            res.send(err);
        res.json(customer)

        customer.name = req.body.name
        customer.parent = req.body.parent
        customer.customerimg = req.body.customerimg
        customer.save()

    });
});
app.get('/api/customer/:cust_id', function (req, res) {
    Customer.findById(req.params.cust_id, function (err, customer) {

        if (err)
            res.send(err);
     res.json(customer);
    })
})
app.get('/api/customername',function (req,res) {
    Customer.find({}, 'name', function (err, data) {
        if (err)
            res.send(err)
        res.json(data)

    })
})