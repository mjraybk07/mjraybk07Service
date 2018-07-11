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


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('accounts').del()
    .then(function () {
      // Inserts seed entries
      return knex('accounts').insert([
        
        createAccount()

      ]);
    });
};
