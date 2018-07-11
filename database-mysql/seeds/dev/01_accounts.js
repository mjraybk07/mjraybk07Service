const faker = require('faker');
const Chance = require('chance');

let chance = new Chance();


const createAccount = function () {
  let account = {
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
    companyName: faker.company.companyName(),
    description: chance.paragraph({ sentences: 1 }),
    location: `${faker.address.latitude()},${faker.address.longitude()}`,
    npsScoreCURRENT: chance.integer({min: -100, max:100}),
    npsScorePREDICTED: chance.integer({min: -100, max:100})
  }  
  return account;
}

const batchSize = 1000;


const createBatch = function () {  
  let result = []; 
  
  for (var i = 0; i < batchSize; i++) {
    let account = createAccount();
    result.push(account);
  }
  return result;
}


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('accounts').del()
    .then(function () {
      let chunkSize = 1000;
      let batch = createBatch();
      
      // Inserts seed entries
      return knex.batchInsert('accounts', batch, chunkSize)
        .returning('id')
        .then(function (ids) {
          console.log('Batch insert successful');
        })
        .catch( function (error) {
          console.log(error)
        })
    });
};
