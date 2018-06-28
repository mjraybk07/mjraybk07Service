const mongoose = require('mongoose');
const faker = require('faker')
const Account = require('./models/account');
const Case = require('./models/case');
const AccountOverview = require('./models/accountOverview');

const ObjectId = require('mongodb').ObjectID;

const options = {
  poolSize: 200
}
 
mongoose.connect('mongodb://localhost/mjraybk07ServiceDev', options); // TODO
 
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('mongoose db connection open..'));


// ---- Account Overviews  -----


const saveAccountOverview = (data, callback) => {
  console.log('Saving account overview..');
  
  new AccountOverview(data).save( (err, accountOverviewEntry) => {
    if (err) {
      callback(err, null);
    } else {
      console.log('new account overview saved to db: ', accountOverviewEntry)
      callback(null, accountOverviewEntry);
      
    }
  })
  
}

const getAllAccountOverviews = (callback) => {
  console.log('Getting all account overviews')
  
  AccountOverview.find( (err, accountOverviews) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, accountOverviews)
    }
  })
}

//  ---- Accounts ----

const getAllAccountIds = (callback) => {
  console.log('getting all account ids')
  
  Account.find( (err, accounts) => {
    if (err) {
      callback(err, null)
    } else {
      var arr = accounts.map( (account)=> {
        return account._id;
      })
      callback(null, arr)
    }
  })
}



//  --- Cases ---


const getCasesByAccountId = (accountId, callback) => {
  console.log(`Getting cases by account id: ${accountId}`)
  
  accountId = ObjectId(accountId) // format string to objectId for mongo db
 
  let casesArr = [];

  Case.
  find({account_id: accountId}).
  cursor().
  on('data', function (result) {
    casesArr.push(result)    
  }).
  on('error', function (error){
    callback(error, null)
  }).
  on('end', function () {    
    console.log(`Done streaming cases for account id: ${accountId}`)
    callback(null, casesArr)
   })

}


module.exports = {
  db,
  getAllAccountOverviews,
  saveAccountOverview,
  getAllAccountIds,
  getCasesByAccountId
};
