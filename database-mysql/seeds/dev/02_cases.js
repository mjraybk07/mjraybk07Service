const faker = require('faker');
const Chance = require('chance');

let chance = new Chance();

const createCase = function () {
  
  let newCase = {
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
    resolved_at: faker.date.recent(),
    account_id: 1,
    title: chance.sentence({ words: 5 }),
    text: chance.paragraph({ sentences: 1 }),
    npsScoreCURRENT: chance.integer({min: -100, max:100}),
    npsScorePREDICTED: chance.integer({min: -100, max:100}),
    resolved: true
  }
  return newCase;
}

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cases').del()
    .then(function () {
      // Inserts seed entries
      return knex('cases').insert([
        
        createCase()
            
      ]);
    });
};
