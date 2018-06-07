const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  
  startDate: Date,
  endDate:  Date,
  account_id: String,
  title: String, 
  description: String,
  npsScoreCurrent:  String,
  npsScoreHighest: 
    {
      npsScore:  String,
      date: Date,
      accountOverview_id: String
    },
  npsScoreLowest: 
    {
      npsScore:  String,
      date: Date,
      accountOverview_id: String
    },
  cases: [],
  users: [],
  numberOfCasesResolved:  String,
  numberOfUsers: String,
  numberOfMessages:  String,
  averageTimeToMessageReponse: String,
  averageTimeToCasesResolution: String  

});

module.exports = mongoose.model('AccountOverview', schema);