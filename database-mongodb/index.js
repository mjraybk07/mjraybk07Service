const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test'); // TODO

const db = mongoose.connection;

// TEMPORARY
const Cat = mongoose.model('Cat', {name: String});
const kitty = new Cat({name: 'buddy'});
kitty.save().then( () => console.log('MEow wow'));


module.exports = {
  db
}