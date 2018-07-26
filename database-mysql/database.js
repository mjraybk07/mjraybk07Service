
const knex = require('knex')(require('../knexfile'));


const getAccountOverviewById = (accountId, callback) => {
  console.log(`Getting account overview by account id ${accountId}`);
  
  return knex.select().from('accountOverviews').whereRaw(`account_id=${accountId}`)
  .then ( (accountOverview) => {
    callback(null, accountOverview)
  })
  .catch( (err) => {
    callback(err, null)
  })
}

const getAccountById = (accountId, callback) => {
  console.log(`Getting account by account id ${accountId}`);
  
  return knex.select().from('accounts').whereRaw(`id=${accountId}`)
  .then ( (account) => {
    callback(null, account)
  })
  .catch( (err) => {
    callback(err, null)
  })
}

const getCasesByAccountId = (accountId, callback) => {
  console.log(`Getting cases by account id ${accountId}`);
  
  return knex.select().from('cases').whereRaw(`account_id=${accountId}`)
  .then ( (cases) => {
    callback(null, cases)
  })
  .catch( (err) => {
    callback(err, null)
  })
}


const getUsersByAccountId = (accountId, callback) => {
  console.log(`Getting users by account id ${accountId}`);
  
  return knex.select().from('users').whereRaw(`account_id=${accountId}`)
  .then ( (users) => {
    callback(null, users)
  })
  .catch( (err) => {
    callback(err, null)
  })
}

const getMessagesByUserId = (userId, callback) => {
  console.log(`Getting messages by user id ${userId}`);
  
  return knex.select().from('messages').whereRaw(`user_id=${userId}`)
  .then ( (messages) => {
    callback(null, messages)
  })
  .catch( (err) => {
    callback(err, null)
  })
}


module.exports = {
  // getAllAccountOverviews,
  // saveAccountOverview,
  // getAllAccountIds,
  getAccountById,
  getCasesByAccountId,
  getUsersByAccountId,
  // getMessagesByAccountId,
  getMessagesByUserId,
  getAccountOverviewById
};