var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb'); // connect to our database
var Stud = require('./model/stud');
var Dept = require('./model/emp');
var Emp = require('./model/dept');
var Book = require('./model/book');
var Auther = require('./model/author');
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/api', router);

var server = app.listen(82, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

});

module.exports = app;

//API For Single Table STUD
router.route('/studs')
    .post(function (req, res) {

        var stud = new Stud();
        stud.name = req.body.name;
        stud.addr = req.body.addr;
        stud.email = req.body.email;
        // save the bear and check for errors
        stud.save(function (err, data) {
            if (err)
                res.send(err);

            res.json({message: data});
        });
    })

    .get(function (req, res) {
        Stud.find(function (err, studs) {
            if (err)
                res.send(err);

            res.json(studs);
        });
    });
router.route('/studs/:stud_id')

// get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function (req, res) {
        Stud.findById(req.params.stud_id, function (err, stud) {
            if (err)
                res.send(err);
            res.json(stud);
        });
    })

    .put(function (req, res) {

        // use our bear model to find the bear we want
        Stud.findById(req.params.stud_id, function (err, stud) {

            if (err)
                res.send(err);

            stud.name = req.body.name;
            stud.addr = req.body.addr;
            stud.email = req.body.email;


            // save the bear
            stud.save(function (err, data) {
                if (err)
                    res.send(err);

                res.json({message: data});
            });

        });
    })

    .delete(function (req, res) {
        Stud.remove({
            _id: req.params.stud_id
        }, function (err, stud) {
            if (err)
                res.send(err);

            res.json({message: stud});
        });
    });

//API For TWO Table EMP AND DEPT

router.route('/depts')
    .post(function (req, res) {

        var dept = new Dept();

        dept.deptname = req.body.deptname;
        dept.emp = req.body.emp;


        // save the bear and check for errors
        dept.save(function (err, data) {
            if (err)
                res.send(err);

            res.json({message: data});
        });
    })

    .get(function (req, res) {
        Dept.find(function (err, studs) {
            if (err)
                res.send(err);

            res.json(studs);
        });
    });

router.route('/emps')
    .post(function (req, res) {

        var emp = new Emp();

        emp.empname = req.body.deptname;


        // save the bear and check for errors
        emp.save(function (err, data) {
            if (err)
                res.send(err);

            res.json({message: data});
        });
    })
    .get(function (req, res) {
        Emp.find(function (err, studs) {
            if (err)
                res.send(err);

            res.json(studs);
        });
    })

router.route('/emps/:dept_id')

    .get(function (req, res) {
        Emp.find().populate('dept', 'deptname').exec(function (err, data) {

            if (err)
                res.send(err);
            else
                res.json(data);

        })
    })
//API For TWO Table MANY TO MANY RELATIONSHI BOOK,AUTHER

router.route('/book')

    .post(function (req, res) {

        var book = new Book();

        book.bookname = req.body.bookname;
        book.authr = req.body.authr;
        book.save().then(function (err, book) {
            Auther.findById({_id: book.authr}).exec(function (err, auth) {
                auth.book.push(book._id);
                auth.save();

            });
        })
    })

    .get(function (req, res) {

        Book.find(function (err, data) {
            if (err)
                res.send(err)
            else
                res.json(data)

        }).sort({auth: -1})

    })

router.route('/auth')

    .post(function (req, res) {
        var auth = new Auther();
        auth.authname = req.body.authname;
        auth.book = req.body.book;
        auth.save().then(function () {
          return  Book.findById({_id: auth.book})
        }).then(function (err,book) {
            book.authers.push(auth);
            book.save();


        })
    })

    .get(function (req, res) {

        Auther.find(function (err, data) {
            if (err)
                res.send(err)
            else
                res.json(data)

        })

    })
    .get(function (req, res) {

        Auther.findById(req.params.auth_id, function (err, data) {
            if (err)
                res.send(err)
            else
                res.json(data)

        })

    })
    .get(function (req, res) {

        Auther.findById(req.params.book_id, function (err, data) {
            if (err)
                res.send(err)
            else
                res.json(data)

        })

    })
router.route('/book/:book_id')
    .delete(function (req, res) {

        Book.remove({_id: req.params.book_id}, function (err, data) {
            if (err)
                res.send(err)
            else
                res.send(data)
        })

    })

router.route('/auth/:auth_id')
    .delete(function (req, res) {

        Auther.remove({_id: req.params.auth_id}, function (err, data) {
            if (err)
                res.send(err)
            else
                res.send(data)
        })

    })


router.route('/book/:auth_id')
    .get(function (req, res) {

        Book.find().populate('auth', 'authname').exec(function (err, data) {
            if (err)
                res.send(err)
            else
                res.json(data)
        })

    })
router.route('/auth/:book_id')
    .get(function (req, res) {

        Auther.find().populate('book', 'bookname').exec(function (err, data) {
            if (err)
                res.send(err)
            else
                res.json(data)
        })

    })

router.route('/book')
    .get(function (req, res) {
        Book.find().sort({bookname: -1}).exec(function (err, data) {

            if (err)
                res.send(err)
            else
                res.send(data)
        })

    })


// function create(req, res, next) {
//     var book = new Book();
//     book.name = req.body.name;
//     book.author = mongoose.Types.ObjectId(req.body.author);
//     book.owner = res.locals.session;
//     book.createdBy = res.locals.session;
//     book.save()
//         .then(function (book) {
//             //console.log(book);
//             return User.getByUserId(res.locals.session);
//         })
//         .then(function (user) {
//             // console.log(user);
//             user.books.push(book);
//             return user.save()
//         }).then(function (usersaved) {
//         return Author.getByAuthorId(mongoose.Types.ObjectId(req.body.author));
//     })
//         .then(function (author) {
//             // console.log(author);
//             author.books.push(book);
//             return author.save();
//         })
//         .then(function () {
//             return res.json({message: "Book created."});
//         })
//         .catch(function (err) {
//             // console.log(err);
//             return next(err);
//         })
// }