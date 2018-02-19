var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Book = require('../models/bookImp');
var db = require('../app')

router.get('/carti', ensureAuthenticated, (req, res) => {
  // console.log("mama");
  Book.getBooks(Book, function(err, books) {
    if (err) throw err;
    // console.log(books);
    res.render('carti', {
      books: books
    });
  });
});

router.get('/addbook', ensureAuthenticated, function(req, res, next) {
  res.render('addbook');
});

router.post('/addbook', function(req, res, next) {
  var nrinv = req.body.nrinv;
  var titlu = req.body.titlu;
  var autor = req.body.autor;
  var editura = req.body.editura;
  var an = req.body.an;
  var pret = req.body.pret;

  //console.log(name);

  req.checkBody('nrinv', 'Introduceti numarul de inventar').notEmpty();
  req.checkBody('titlu', 'Introduceti titlul').notEmpty();
  req.checkBody('autor', 'Introduceti autorul').notEmpty();
  req.checkBody('editura', 'Introduceti editura si locul').notEmpty();
  req.checkBody('an', 'Introduceti anul').notEmpty();
  // req.checkBody('an', 'Introduceti anul').isnumber();
  req.checkBody('pret', 'Introduceti pretul').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    res.render('addbook', {
      errors: errors
    });
  } else {
    var newBook = new Book({
      nrinv: nrinv,
      titlu: titlu,
      autor: autor,
      editura: editura,
      an: an,
      pret: pret
    });

    Book.addBook(newBook, function(err, book) {
      if (err) throw err;
      console.log(book);
    });

    req.flash('success_msg', 'Ati adaugat o carte cu succes');

    res.redirect('/booksImp/addbook');
  }
});

router.post('/addbook',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/booksImp/addbook',
    failureFlash: true
  }),
  function(req, res) {
    res.redirect('/');
  });

router.delete('booksImps/:_id', function(req, res) {
  var id = req.params._id;
  Book.removeBook(id, function(err, book) {
    if (err) throw err;
  })
})



function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    //req.flash('error_msg', 'Trebuie sa va logati');
    res.redirect('/users/login');
  }
}

module.exports = router;