const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  
  createdAt: { type: Date, default: Date.now },
  startDate: Date,
  endDate:  Date,
  account_id: {type: Number, required: true},
  title: String, 
  description: String,
  npsScoreCurrent:  Number,
  npsScoreHighest: 
    {
      npsScore:  Number,
      date: Date,
      accountOverview_id: Number
    },
  npsScoreLowest: 
    {
      npsScore:  Number,
      date: Date,
      accountOverview_id: Number
    },
  cases: [Number],
  users: [Number],
  numberOfCasesResolved:  Number,
  numberOfUsers: Number,
  numberOfMessages:  Number,
  averageTimeToMessageReponse: Number,
  averageTimeToCasesResolution: Number  

});

module.exports = mongoose.model('AccountOverview', schema);