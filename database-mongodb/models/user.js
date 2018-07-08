const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

  createdAt: { type: Date, default: Date.now },
  account_id: Schema.Types.ObjectId,
  userName: String,
  jobTitle: String,
  email: String,
  jobType: String,
  phone: String 

})

module.exports = mongoose.model('User', schema);