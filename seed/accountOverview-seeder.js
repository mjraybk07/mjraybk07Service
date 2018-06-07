const AccountOverview = require('../database-mongodb/models/accountOverview')
//const db = require('../database-mongodb/index');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test'); // TODO
 
let overviews =   [
    new AccountOverview({
      startDate: new Date(),
      endDate:  new Date(),
      account_id: 'goooooooooooooooooooD',
      title: 'F test F coroporation F', 
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
    }),
    new AccountOverview({
      startDate: new Date(),
      endDate:  new Date(),
      account_id: '8______YYYY_______ASDFASDFAF',
      title: 'G test G coroporation G', 
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
    })
  ];
  
//const accountOverview = new AccountOverview (testOverview);

//db.saveAccountOverview(accountOverview, (err, result) => console.log('saved data ...', accountOverview))

let done = 0;
let len = overviews.length;

for (var i = 0; i < len; i++) {
  overviews[i].save( (err, result) => {
    done++;
    console.log('Added overview for account_id:', result.account_id)
    if ( done === len ) {
      exit();
    }
  })
}

function exit () {
  mongoose.disconnect()
}

// accountOverview.save( (err, accountOverviewEntry) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log('new account overview saved to db: ', accountOverviewEntry)
//     mongoose.disconnect()
//   }
// })
