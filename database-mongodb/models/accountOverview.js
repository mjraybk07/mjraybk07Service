const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  
  createdAt: { type: Date, default: Date.now },
  startDate: Date,
  endDate:  Date,
  account_id: Schema.Types.ObjectId,
  title: String, 
  description: String,
  npsScoreCurrent:  Number,
  npsScoreHighest: 
    {
      npsScore:  Number,
      date: Date,
      accountOverview_id: Schema.Types.ObjectId
    },
  npsScoreLowest: 
    {
      npsScore:  Number,
      date: Date,
      accountOverview_id: Schema.Types.ObjectId
    },
  cases: [Schema.Types.ObjectId],
  users: [Schema.Types.ObjectId],
  numberOfCasesResolved:  Number,
  numberOfUsers: Number,
  numberOfMessages:  Number,
  averageTimeToMessageReponse: Number,
  averageTimeToCasesResolution: Number  

});

module.exports = mongoose.model('AccountOverview', schema);