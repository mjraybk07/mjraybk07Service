const faker = require('faker');
const Chance = require('chance');

let chance = new Chance();

const createCase = function (accountId) {
  
  let newCase = {
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
    resolved_at: faker.date.recent(),
    account_id: accountId,
    title: chance.sentence({ words: 5 }),
    text: chance.paragraph({ sentences: 1 }),
    npsScoreCURRENT: chance.integer({min: -100, max:100}),
    npsScorePREDICTED: chance.integer({min: -100, max:100}),
    resolved: true
  }
  return newCase;
}

const batchSize = 10; // set target for table total


const createBatchById = function (accountId) {  
  let result = []; 
  
  for (var i = 0; i < batchSize; i++) {
    let newCase = createCase(accountId);
    result.push(newCase);
  }
  return result;
}


const flatten = function (arr, result = []) {
  for (let i = 0, length = arr.length; i < length; i++) {
    const value = arr[i];
    if (Array.isArray(value)) {
      flatten(value, result);
    } else {
      result.push(value);
    }
  }
  return result;
};

// delete the cases table
// get all account Ids
// for each account Id
//   create batches of 10 cases for each account Id
// flatten the array or bathes into a single level array
// batchInsert the batch of cases into the cases table



exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cases').del()
    .then(function () {
      return knex.select('id').from('accounts').map( function(row) {         
          return createBatchById(row.id);
        })      
      }
    )
    .then(function (batches) {
      return flatten(batches);
    })
    .then(function (batch) {
      
      let chunkSize = 1000;
       
      // Inserts seed entries
      return knex.batchInsert('cases', batch, chunkSize)
        .returning('id')
        .then(function (ids) {
          console.log('Batch insert successful, cases batch: ', ids);
        })
        .catch( function (error) {
          console.log(error)
        })
    });
};
