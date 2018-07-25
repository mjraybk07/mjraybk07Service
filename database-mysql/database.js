
const knex = require('knex')(require('../knexfile'));


const getAccountOverviewById = (accountId, callback) => {
  console.log(`Getting account overview for account id ${accountId}`);
  
  return knex.select().from('accountOverviews').whereRaw(`account_id=${accountId}`)
  .then ( (accountOverview) => {
    callback(null, accountOverview)
  })
  .catch( (err) => {
    callback(err, null)
  })
}


module.exports.getAccountOverviewById = getAccountOverviewById;

