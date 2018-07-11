const faker = require('faker');
const Chance = require('chance');

let chance = new Chance();

const createMessage = function () {
  let message =  {
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
    account_id: 1,
    case_id: 1,
    subject: chance.sentence({ words: 5 }),
    message: chance.paragraph({ sentences: 1 })  
  }  
  return message;
}


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('messages').del()
    .then(function () {
      // Inserts seed entries
      return knex('messages').insert([

        createMessage()

      ]);
    });
};
