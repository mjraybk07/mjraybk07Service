const mongoose = require('mongoose');

const Account = require('../database-mongodb/models/account');
const User = require('../database-mongodb/models/user');
const Case = require('../database-mongodb/models/case');
const Message = require('../database-mongodb/models/message');
const AccountOverview = require('../database-mongodb/models/accountOverview');
//const db = require('../database-mongodb/index');


const ObjectId = require('mongodb').ObjectID;

const faker = require('faker');
const Chance = require('chance');

let chance = new Chance();


const OPTIONS = {
  poolSize: 200
}

const ACCOUNTS_LIMIT = 250000;
const CASES_PER_ACCOUNT_LIMIT = 4;
const USERS_PER_ACCOUNT_LIMIT = 4;
const MESSAGES_PER_CASE_LIMIT = 1;
 
mongoose.connect('mongodb://localhost/mjraybk07ServiceDev', OPTIONS); // TODO change DB address




// CREATE DUMMY DOCUMENTS BY TYPE
 
 
const createAccount = () => {
  return new Account ({       
    createdAt: faker.date.past(),
    companyName: faker.company.companyName(),
    description: chance.paragraph({ sentences: 1 }),
    location: {
      latitude: faker.address.latitude(),
      longitude: faker.address.longitude()
      },
    npsScoreCURRENT: chance.integer({min: -100, max:100}),
    npsScorePREDICTED: chance.integer({min: -100, max:100})
  })  
}


const createUser = (accountId) => {
  return new User ({
    createdAt: faker.date.past(),
    account_id: accountId,
    userName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
    jobType: faker.name.jobType(),
    phone: faker.phone.phoneNumber()
  })
}

const createCase = (accountId) => {
  return new Case ({
    createdAt: faker.date.past(),
    resolvedAt: faker.date.recent(),
    account_id: accountId,
    title: chance.sentence({ words: 5 }),
    text: chance.paragraph({ sentences: 1 }),
    npsScoreCURRENT: chance.integer({min: -100, max:100}),
    npsScorePREDICTED: chance.integer({min: -100, max:100}),
    resolved: true
  })
}

const createMessage = (caseId) => {
  return new Message ({
    createdAt: faker.date.past(),
    case_id: caseId,
    subject: chance.sentence({ words: 5 }),
    message: chance.paragraph({ sentences: 5 })
  })
}
 
  
// const createOverview = (accountId) => {
//   return new AccountOverview({
//     createdAt: new Date(),
//     startDate: faker.date.past(),
//     endDate:  new Date(),
//     account_id: accountId,
//     title: faker.company.companyName(), 
//     description: faker.internet.email(),
//     npsScoreCURRENT: chance.integer({min: -100, max:100}),
//     npsScorePREDICTED: chance.integer({min: -100, max:100}),
//     npsScoreHighest: 
//       {
//         npsScore:  chance.integer({min: -100, max:100}),
//         date: faker.date.recent(),
//         accountOverview_id: faker.random.number()
//       },
//     npsScoreLowest: 
//       {
//         npsScore:  chance.integer({min: -100, max:100}),
//         date: faker.date.recent(),
//         accountOverview_id: faker.random.number()
//       },
//     cases: [],
//     users: [],
//     numberOfCasesResolved:  chance.integer({min: 0, max:2000}),
//     numberOfUsers: chance.integer({min: 3, max:3000}),
//     numberOfMessages:  chance.integer({min: 0, max:30000}),
//     averageTimeToMessageReponse: chance.minute(),
//     averageTimeToCasesResolution: chance.hour()  
//   })
// }


// SAVE DUMMY DOCUMENTS BY TYPE 


const saveAccount = () => {
  return new Promise( (resolve, reject) => {
    let newAccount = createAccount();
    
    newAccount.save()
    .then( (result) => {
      console.log('added account id:', result._id)
      resolve(result._id)
    })
    .catch( (err) => {
      exit();
      reject( err)
      
    })
    
  })
}


const saveCase = (accountId) => {
  return new Promise( (resolve, reject) => {
    
    let newCase = createCase(accountId)
    
    newCase.save()
      .then( (result) => {
        console.log('added case id:', result._id)
        resolve(result._id)
      })
      .catch( (err) => {
        exit();
        console.error('saveCase error:', err.message)
        reject(err)
      })   
    
  })
}



const saveUser = (accountId) => {
  return new Promise( (resolve, reject) => {
    
    let newUser = createUser(accountId);
    
    newUser.save()
    .then( (result) => {
      console.log('added user id:', result._id)
      resolve(result._id)
    })
    .catch( (err) => {
      exit();
      console.log('error: ', err)
      reject(err);
    })
    
  })
}



const saveMessage = (caseId) => {
  return new Promise( (resolve, reject) => {
    let newMessage = createMessage(caseId);
    
    newMessage.save()
    .then( (result) => {
      console.log('added message id:', result._id)
      resolve(result._id)
    })
    .catch( (err) => {
      exit();
      console.log('error: ', err)
      reject(err);
    })
    
  })
}


const saveOverview = (accountId) => {
  return new Promise( (resolve, reject) => {
    let newOverview = createOverview()
    
    newOverview.save(accountId)
    .then( (result) => {
      console.log('added account overview id: ', result._id)
      resolve(result._id);
    })
    .catch( (err) => {
      exit();
      console.log('error: ', err)
      reject(err);
    })   
    
  })   
}


// EXIT mongo connections (after seeding data)


const exit = () => {
  mongoose.disconnect()
}



//-----------------------------------------------------------------



// SEEDER FUNCTIONS


const seedAccountsAsync = async () => {
  var tempArray = []

  for (let i = 0; i < ACCOUNTS_LIMIT; i++) {
    
    var result = await saveAccount()
    tempArray = tempArray.concat([result])
  
  }
  return tempArray;
}



const seedAccountsPROMISE = () => {
  return new Promise ((resolve, reject) => {
    
    seedAccountsAsync()
    .then( (accountIds) => {
      console.log('saved account ids:', accountIds)
      resolve(accountIds);
    })
    .catch( (error) => {
      reject(error) 
    })   
    
  })
  
}





const seedCasesPerAccount = async (accountId) => {
  
  let caseIds = [];
  
  for (let i = 0; i < CASES_PER_ACCOUNT_LIMIT; i++) {
    
    let savedCaseId = await saveCase(accountId)
    .then((result)=> {
      return result;
    })
    .catch( (error) => {
      console.error('seedCasesPerAccount error: ', error.message)
    })
    
    caseIds = caseIds.concat(await savedCaseId);     
  }

  return caseIds;
  
}



const getUsersGroup = async (accountId) => {
  
  try {
    
    let newUsers = [];
      
    for (let i = 0; i < USERS_PER_ACCOUNT_LIMIT; i++) {
      
      let newUser = await createUser(accountId)
      
      newUsers.push(newUser)
    
    }
    
    return newUsers;    
  
  } catch (error) {
    
    console.log(error)
  
  }
}


const insertManyUsers = async (accountId) => { 
  
  try {
    
    console.log('seeding users .........')
        
    let newUsers = await getUsersGroup(accountId);

    User.insertMany(newUsers)
    .then( (result) => {
      console.log(`${result.length} records inserted of accountId ${accountId}`)
      return result;
    })
    .catch((err) => {
      console.log(err)
    })
    
    return newUsers;
    
  } catch (err) {
    
    console.log(error)
  }
  
}


// not using currently
const getMessagessGroup = async (caseId) => {
  
  try {
    
    let newMessages = [];
      
    for (let i = 0; i < MESSAGES_PER_CASE_LIMIT; i++) {
      
      let newMessage = await createMessage(caseId)
      
      newMessages.push(newMessage)
    
    }
    
    return newMessages;    
  
  } catch (error) {
    
    console.log(error)
  
  }
}


const insertManyMessages = async (caseId) => { 
  
  try {
    
    console.log('seeding messages .........')
        
    let newMessage = await createMessage(caseId); // create a group here if needed

    Message.insertMany(newMessage)
    .then( (result) => {
      console.log(`${result.length} records inserted for caseId ${caseId}`)
      return result;
    })
    .catch((err) => {
      console.log(err)
    })
    
    return newUsers;
    
  } catch (err) {
    
    console.log(error)
  }
  
}







// --------- SEEDINNG SCRIPTS -------------


// ---  accounts  ---


const seedAllAccounts = () => {
  
  seedAccountsPROMISE()
  .then( (result) => {
    console.log('Done seeding accounts', result)
    exit()
    return result
  })
  .catch ((error)=>{
    console.log(error.message)
  })
  
}




// ---  cases ---

const seedAllCasesSTREAM = () => {
  
  Account.
  find({}).
  cursor().
  on('data', function(account) { 
    seedCasesPerAccount(account._id) 
  }).
  on('end', function() { 
    exit()
    console.log('Done seeding cases.'); 
  });
  
}




 // --- users ----
 
const seedAllUsersSTREAM = () => {
  
  Account.
  find({}).
  cursor().
  on('data', function (account) {
    
    insertManyUsers(account._id);
    
  }).
  on('end', function () {
    exit()
    console.log('Done seeding users.')
   })
  
}

// --- messages ----

const seedAllMessagesSTREAM = () => {
  
  Case.
  find({}).
  cursor().
  on('data', function (result) {
    
    insertManyMessages(result._id);
    
  }).
  on('end', function () {
    exit()
    console.log('Done seeding messages.')
   })
  
}
  
  

  
  
// -----  SEEDINNG INVOCATIONS -----



// seedAllAccounts()

// seedAllCasesSTREAM()

// seedAllUsersSTREAM()

// seedAllMessagesSTREAM()






