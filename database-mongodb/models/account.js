const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  
  createdAt: { type: Date, default: Date.now },
  companyName: String,
  location: Object,
  description: String,
  npsScoreCURRENT: Number,
  npsScorePREDICTED:  Number

});

module.exports = mongoose.model('Account', schema);