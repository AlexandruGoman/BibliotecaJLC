var express = require('express');
var router = express.Router();

var Book = require('../models/bookImp');



router.get('/', ensureAuthenticated, (req, res) => {
  res.render('index');
})

// router.get('/api/books', ensureAuthenticated, function(req, res) {
//   Book.getBooks(function(err, books) {
//     if (err) {
//       throw err;
//     }
//     res.json(books);
//   });
// });
//
// router.get('/api/books/:_id', ensureAuthenticated, function(req, res) {
//   Book.getBookById(req.params._id, function(err, book) {
//     if (err) {
//       throw err;
//     }
//     res.json(book);
//   });
// });
//
// router.delete('/api/books/:_id', ensureAuthenticated, function(req, res) {
//   var id = req.params._id;
//   Book.removeBook(id, (err, book) => {
//     if (err) {
//       throw err;
//     }
//     res.json(book);
//   });
// });

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    //req.flash('error_msg', 'Trebuie sa va logati');
    res.redirect('/users/login');
  }
}

module.exports = router;