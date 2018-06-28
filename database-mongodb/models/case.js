const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema ({
  
  createdAt: { type: Date, default: Date.now },
  account_id: Schema.Types.ObjectId,
  title: String,
  text: String,
  npsScoreCURRENT: Number,
  npsScorePREDICTED: Number,
  resolved: Boolean

})

module.exports = mongoose.model('Case', schema);