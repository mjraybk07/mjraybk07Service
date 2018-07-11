const faker = require('faker');
const Chance = require('chance');

let chance = new Chance();

const createUser = function () {
  let user = {
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
    account_id: 1,
    userName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    jobTitle: faker.name.jobTitle(),
    jobType: faker.name.jobType(),
    phoneNumber: faker.phone.phoneNumber(),
    email: faker.internet.email() 
  }
  return user;
}


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        
        createUser()
        
      ]);
    });
};
