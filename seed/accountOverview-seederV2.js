const AccountOverview = require('../database-mongodb/models/accountOverview')
//const db = require('../database-mongodb/index');

const faker = require('faker');
const Chance = require('chance');

let chance = new Chance();

const mongoose = require('mongoose');

const options = {
  poolSize: 200
}
 
mongoose.connect('mongodb://localhost/mjraybk07ServiceDev', options); // TODO
 
  
const createMockOverview = () => {
  return new AccountOverview({
    createdAt: new Date(),
    startDate: faker.date.past(),
    endDate:  new Date(),
    account_id: faker.random.number(),
    title: faker.company.companyName(), 
    description: faker.internet.email(),
    npsScoreCurrent:  chance.integer({min: -100, max:100}),
    npsScoreHighest: 
      {
        npsScore:  chance.integer({min: -100, max:100}),
        date: faker.date.recent(),
        accountOverview_id: faker.random.number()
      },
    npsScoreLowest: 
      {
        npsScore:  chance.integer({min: -100, max:100}),
        date: faker.date.recent(),
        accountOverview_id: faker.random.number()
      },
    cases: [],
    users: [],
    numberOfCasesResolved:  chance.integer({min: 0, max:2000}),
    numberOfUsers: chance.integer({min: 3, max:3000}),
    numberOfMessages:  chance.integer({min: 0, max:30000}),
    averageTimeToMessageReponse: chance.minute(),
    averageTimeToCasesResolution: chance.hour()  
  })
}


const saveMockOverview = () => {
  return new Promise ( (resolve, reject) => {
    let randomEntry = createMockOverview()
    
    randomEntry.save()
    .then( (result) => {
      console.log('added entry id: ', result.account_id)
      resolve(result.account_id);
    })
    .catch( (err) => {
      exit();
      console.log('error: ', err)
      reject(err);
    })   
    
  })   
}

const addAsync = async () => {
  let done = 0;
  let len = 10000;
  var tempArray = []

  for (let i = 0; i < len; i++) {
    
    var result = await saveMockOverview()
    tempArray = tempArray.concat([result])
  
  }
  console.log(tempArray)  
  exit()
}




function exit () {
  mongoose.disconnect()
}


addAsync()
addAsync()
addAsync()
addAsync()
addAsync()
addAsync()
addAsync()
addAsync()
addAsync()
addAsync()
addAsync()
addAsync()
addAsync()
addAsync()
addAsync()
addAsync()
addAsync()
addAsync()
addAsync()
addAsync()
addAsync()
addAsync()
addAsync()
addAsync()
addAsync()
