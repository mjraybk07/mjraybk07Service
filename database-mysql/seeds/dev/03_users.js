const faker = require('faker');
const Chance = require('chance');

let chance = new Chance();

const createUser = function (accountId) {
  let user = {
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
    account_id: accountId,
    userName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    jobTitle: faker.name.jobTitle(),
    jobType: faker.name.jobType(),
    phoneNumber: faker.phone.phoneNumber(),
    email: faker.internet.email() 
  }
  return user;
}

const batchSize = 10; // set target for table total

const createBatchById = function (accountId) {  
  let result = []; 
  
  for (var i = 0; i < batchSize; i++) {
    let newUser = createUser(accountId);
    result.push(newUser);
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


exports.seed = function(knex, Promise) {
  
  console.log('Starting clock, seeding users')
  console.time('users time')  // start timer
  
  
  return knex('users').del()
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
      return knex.batchInsert('users', batch, chunkSize)
        .returning('id')
        .then(function (ids) {
          //console.log('Batch insert successful, users batch: ', ids);
          
          console.log('Stopping clock, done seeding users')
          console.timeEnd('users time')  // end timer
        })
        .catch( function (error) {
          console.log(error)
        })
    });
};
