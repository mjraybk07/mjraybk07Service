const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema ({
  
  createdAt: { type: Date, default: Date.now },
  account_id: Number,
  title: String,
  text: String,
  npsScoreCURRENT: Number,
  npsScorePREDICTED: Number,
  resolved: Boolean

})

module.exports = mongoose.model('Case', schema);