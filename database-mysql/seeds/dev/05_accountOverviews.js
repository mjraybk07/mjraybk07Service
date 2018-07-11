const faker = require('faker');
const Chance = require('chance');

let chance = new Chance();

const createAccountOverview = function () {
  let overview = 
    {
      created_at: new Date(),
      updated_at: new Date(),
      start_date: faker.date.past(),
      end_date:  new Date(),
      account_id: 1,
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

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('accountOverviews').del()
    .then(function () {
      // Inserts seed entries
      return knex('accountOverviews').insert([
        
       createAccountOverview()

      ]);
    });
};
