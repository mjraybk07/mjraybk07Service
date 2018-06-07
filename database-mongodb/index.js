const mongoose = require('mongoose');
const faker = require('faker')
const AccountOverview = require('./models/accountOverview');

mongoose.connect('mongodb://localhost/test'); // TODO

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('mongoose db connection open..'));


// ---- Account Overviews  -----

// const accountOverviewSchema = new mongoose.Schema(
//   {
//     startDate: Date,
//     endDate:  Date,
//     account_id: String,
//     title: String, 
//     description: String,
//     npsScoreCurrent:  String,
//     npsScoreHighest: 
//       {
//         npsScore:  String,
//         date: Date,
//         accountOverview_id: String
//       },
//     npsScoreLowest: 
//       {
//         npsScore:  String,
//         date: Date,
//         accountOverview_id: String
//       },
//     cases: [],
//     users: [],
//     numberOfCasesResolved:  String,
//     numberOfUsers: String,
//     numberOfMessages:  String,
//     averageTimeToMessageReponse: String,
//     averageTimeToCasesResolution: String  
//   }
// );

// let AccountOverview = mongoose.model('AccountOverview', accountOverviewSchema);

const saveAccountOverview = (data, callback) => {
  console.log('Saving account overview..');
  
  new AccountOverview(data).save( (err, accountOverviewEntry) => {
    if (err) {
      callback(err, null);
    } else {
      console.log('new account overview saved to db: ', accountOverviewEntry)
      callback(null, accountOverviewEntry);
      
    }
  })
  
}

const getAllAccountOverviews = (callback) => {
  console.log('Getting all account overviews')
  AccountOverview.find( (err, accountOverviews) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, accountOverviews)
    }
  })
}

// ------

var testOverview =   {
    startDate: new Date(),
    endDate:  new Date(),
    account_id: '1234',
    title: 'test coroporation', 
    description: 'company@company.com',
    npsScoreCurrent:  '55',
    npsScoreHighest: 
      {
        npsScore:  '66',
        date: new Date (),
        accountOverview_id: '789-59595'
      },
    npsScoreLowest: 
      {
        npsScore:  '44',
        date: new Date(),
        accountOverview_id: '789-59595'
      },
    cases: [],
    users: [],
    numberOfCasesResolved:  '3333',
    numberOfUsers: '8888',
    numberOfMessages:  '10101010',
    averageTimeToMessageReponse: '3 minutes',
    averageTimeToCasesResolution: '1 day'  
  };
  
//saveAccountOverview(testOverview, (err, result) => console.log('saved data ...'))


module.exports = {
  db,
  getAllAccountOverviews,
  saveAccountOverview
};
