const AccountOverview = require('../database-mongodb/models/accountOverview')
//const db = require('../database-mongodb/index');

const faker = require('faker');
const Chance = require('chance');

let chance = new Chance();

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test'); // TODO
 
  
const createRandomEntry = () => {
  return new AccountOverview({
    createdAt: new Date(),
    startDate: faker.date.past(),
    endDate:  new Date(),
    account_id: faker.random.number(),
    title: faker.company.companyName(), 
    description: faker.internet.email(),
    npsScoreCurrent:  chance.integer({min: -100, max:100}),
    npsScoreHighest: 
      {
        npsScore:  chance.integer({min: -100, max:100}),
        date: faker.date.recent(),
        accountOverview_id: faker.random.number()
      },
    npsScoreLowest: 
      {
        npsScore:  chance.integer({min: -100, max:100}),
        date: faker.date.recent(),
        accountOverview_id: faker.random.number()
      },
    cases: [],
    users: [],
    numberOfCasesResolved:  chance.integer({min: 0, max:2000}),
    numberOfUsers: chance.integer({min: 3, max:3000}),
    numberOfMessages:  chance.integer({min: 0, max:30000}),
    averageTimeToMessageReponse: chance.minute(),
    averageTimeToCasesResolution: chance.hour()  
  })
}

  
//const accountOverview = new AccountOverview (testOverview);

//db.saveAccountOverview(accountOverview, (err, result) => console.log('saved data ...', accountOverview))

let done = 0;
let len = 20000;

for (var i = 0; i < len; i++) {
  //overviews[i].save( (err, result) => {
  let randomEntry = createRandomEntry();
    
  randomEntry.save( (err, result) => {
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
