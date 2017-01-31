var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var multer  = require('multer')
var morgan = require('morgan');
var Product = require('./models/product');
var Category = require('./models/category');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var User   = require('./models/user'); // get our mongoose model
var config = require('./config')
var bodyParser = require('body-parser');
var path = require('path');
mongoose.connect('mongodb://localhost:27017/mydb');     // connect to mongoDB database on modulus.io
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));
app.use('./public/angular-route.min', express.static(__dirname + './public/angular-route.min'));
app.use('./public/ng-file-upload-all.min', express.static(__dirname + './public/ng-file-upload-all.min'));
app.use('./public/core', express.static(__dirname + './public/core'));
app.use('./uploads', express.static(__dirname + './public/uploads'));
// log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// use morgan to log requests to the console


app.use(morgan('dev'));
app.set('superSecret', config.secret); // secret variable
app.get('/', function(req, res) {
    res.sendFile( __dirname + "/public/" + "index.html" );
});

var server = app.listen(81, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

});
app.get('/api/categories', function(req, res) {

    Category.find(function(err,categories) {
        if (err)
            res.send(err)

        res.json(categories);
    });
});

app.get('/api/products', function(req, res) {
    Product.find(function(err, data) {
        if (err)
            res.send(err)
      res.json(data);
    });
});

var storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, './uploads');
    },
    filename: function (request, file, callback) {
        console.log(file);
        var filename = file.originalname;
        request.body.prodimg = filename;
        callback(null,file.originalname)
    }
});
var upload = multer({storage: storage}).single('prodimg');
app.post('/api/products',upload,function(req, res) {

    Product.create({
        prodid: req.body.prodid,
        prodname: req.body.prodname,
        prodprice: req.body.prodprice,
        prodqty: req.body.prodqty,
        prodcolor: req.body.prodcolor,
        prodimg: req.body.prodimg,
        category: req.body.category,

    }, function (err) {
        if (err)
            res.send(err);
        Product.find(function (err, products) {
            if (err)
                res.send(err)
            res.json(products);


        });
    });
})

app.delete('/api/products/:prod_id', function(req, res) {
    Product.remove({
        _id : req.params.prod_id
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Product.find(function(err, prod) {
            if (err)
                res.send(err)
            res.json(prod);
        });
    });
});
app.put('/api/products/:prod_id',upload,function(req, res) {
    Product.findById(req.params.prod_id, function (err, product) {

        if (err)
            res.send(err);
        res.send(product)

        product.prodid = req.body.prodid;
        product.prodname = req.body.prodname;
        product.prodprice = req.body.prodprice;
        product.prodqty = req.body.prodqty;
        product.prodcolor=req.body.prodcolor;
        product.prodimg = req.body.prodimg;
        product.category = req.body.category;
    });
})
app.get('/api/products/:prod_id',upload,function(req, res) {
    Product.findById(req.params.prod_id, function (err, product) {

        if (err)
            res.send(err);
        res.send(product)
    })
})
app.post('/api/categories', function(req, res) {
    Category.create({
        cateid : req.body.cateid,
        catename : req.body.catename

    }, function(err) {
        if (err)
            res.send(err);

        Category.find(function(err, categories) {
            if (err)
                res.send(err)
            res.json(categories);
        });
    });

});

app.post('/api/user', function(req, res) {
    User.create({
        name : req.body.name,
        password : req.body.password,
        mobile: req.body.mobile,
        admin:true,

    }, function(err) {
        if (err)
            res.send(err);

        User.find(function(err, users) {
            if (err)
                res.send(err)
            res.json(users);
        });
    });

});
app.get('/api/user',function (req,res) {
    User.find(function (err, users) {
        if (err)
            res.send(err)
        res.json(users);
    });
});
app.post('/api/authenticate', function(req, res) {
    // find the user
    User.findOne({
        name: req.body.name
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            // check if password matches
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, app.get('superSecret'), {
                    expiresIn : 60*60*24 // expires in 24 hours
                });
                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }

        }

    });
});
