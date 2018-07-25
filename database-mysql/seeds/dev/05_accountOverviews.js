const faker = require('faker');
const Chance = require('chance');

let chance = new Chance();

const createAccountOverview = function (accountId) {
  let overview = 
    {
      created_at: new Date(),
      updated_at: new Date(),
      start_date: faker.date.past(),
      end_date:  new Date(),
      account_id: accountId,
      npsScoreCURRENT: chance.integer({min: -100, max:100}),
      npsScorePREDICTED: chance.integer({min: -100, max:100}),
      numberOfCases:  chance.integer({min: 0, max:2000}),
      numberOfUsers: chance.integer({min: 3, max:3000}),
      numberOfMessages:  chance.integer({min: 0, max:30000}),
      averageTimeToMessageResponse: chance.minute(),
      averageTimeToCaseResolution: chance.hour()         
    }
  return overview;
}

// GENERATES DUMMY ACCOUNT OVERVIEW FOR EACH ACCOUNT 
//   DOES NOT QUERY TABLES FOR COUNTS


exports.seed = function(knex, Promise) {
  
  console.log('Starting clock, seeding accountOverviews')
  console.time('accountOverviews time')  // start timer
  
  // Deletes ALL existing entries
  return knex('accountOverviews').del()
    .then (function (){
    
      return knex.select('id').from('accounts').map(function (data) {
        return createAccountOverview(data.id);
      })
    })
    .then(function (accountOverviews) {
      // Inserts seed entries
      return knex.batchInsert('accountOverviews', accountOverviews, 1000)
        .returning('id')
        .then( function (ids) {
          //console.log('batch insert accountOverviews id: ', ids)
        })
        .catch( function(err) {
          console.log(err)
        })   
      
    })
    .then(function() {
      console.log('Stopping clock, done seeding accountOverviews')
      console.timeEnd('accountOverviews time')  // end timer
    })
    .catch(function (err) {
      console.log(err)
    })
};
