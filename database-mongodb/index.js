const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test'); // TODO

const db = mongoose.connection;

// TEMPORARY
const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'buddy' });

kitty.save().then(() => console.log('MEow wow'));

const getCats = (callback) => {
  Cat.find((err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports = {
  db,
  getCats
};
