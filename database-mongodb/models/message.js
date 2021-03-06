const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema ({
  
  createdAt: { type: Date, default: Date.now },
  case_id: Schema.Types.ObjectId,
  subject: String,
  message: String
  
})

module.exports = mongoose.model('Message', schema);