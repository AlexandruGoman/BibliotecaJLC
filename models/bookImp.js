var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var BookSchema = mongoose.Schema({
  nrinv: {
    type: String,
    index: true
  },
  titlu: {
    type: String
  },
  autor: {
    type: String
  },
  editura: {
    type: String
  },
  an: {
    type: String
  },
  pret: {
    type: String
  }
});

var Book = module.exports = mongoose.model('bookImp', BookSchema);

module.exports.getBooks = (limit, callback) => {
  Book.find(callback).limit(limit);
}

module.exports.getBookById = (id, callback) => {
  Book.findById(id, callback);
}

module.exports.addBook = (book, callback) => {
  Book.create(book, callback);
}

module.exports.removeBook = (id, callback) => {
  var query = {
    _id: id
  };
  Book.remove(query, callback);
}