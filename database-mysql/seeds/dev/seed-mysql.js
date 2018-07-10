
const bookshelf = require('./database')
const Account = require('../model').Account

const faker = require('faker');
const Chance = require('chance');

let chance = new Chance();


const newAccount = {       
  createdAt: faker.date.past(),
  companyName: faker.company.companyName(),
  description: chance.paragraph({ sentences: 1 }),
  location: {
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude()
    },
  npsScoreCURRENT: chance.integer({min: -100, max:100}),
  npsScorePREDICTED: chance.integer({min: -100, max:100})
   
}

// let test = new Account(newAccount).
//   save(null, {method: 'insert'}).
//   then( function (model) {
//     console.log('Saved model... ', model);
//   })
  
Account.forge(newAccount).fetch().then((acct) => {
  console.log('new acct: ', acct);
})

