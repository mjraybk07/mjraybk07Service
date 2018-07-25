const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  
  createdAt: { type: Date, default: Date.now },
  accountCreatedAt: Date,
  startDate: Date,
  endDate:  Date,
  account_id: Schema.Types.ObjectId,
  companyName: String, 
  description: String,
  location: {
    latitude: String,
    longitude: String
  },
  npsScoreCURRENT:  Number,
  // npsScoreHighest: 
  //   {
  //     npsScore:  Number,
  //     date: Date,
  //     accountOverview_id: Schema.Types.ObjectId
  //   },
  // npsScoreLowest: 
  //   {
  //     npsScore:  Number,
  //     date: Date,
  //     accountOverview_id: Schema.Types.ObjectId
  //   },
  npsScorePREDICTED: Number,
  // cases: [Schema.Types.ObjectId],
  // users: [Schema.Types.ObjectId],
  numberOfCases:  Number,
  numberOfUsers: Number,
  numberOfMessages:  Number,
  numberOfMessages: Number,
  averageTimeToCasesResolution: Number  

});

module.exports = mongoose.model('AccountOverview', schema);