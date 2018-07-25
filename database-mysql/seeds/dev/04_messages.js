const faker = require('faker');
const Chance = require('chance');
let chance = new Chance();

//
// const { Writable } = require('stream');

// const encoding = 'utf8';

// const outStream = new Writable({
//   write(chunk, encoding, callback) {
//     console.log('chunk to string', chunk.toString());
//     callback();
//   }
// });

const fs = require('fs')

const writeStream = fs.createWriteStream('.././data.json')
const readStream = fs.createReadStream('.././data.json')


const createMessage = function (userId) {
  let message =  {
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
    user_id: userId,
    subject: chance.sentence({ words: 5 }),
    message: chance.paragraph({ sentences: 1 })  
  }  
  return message;
}

const batchSize = 3;


// not using this at the moment

const createBatchById = function (userId) {  
  let result = []; 
  
  for (var i = 0; i < batchSize; i++) {
    let newMessage = createMessage(userId);
    result.push(newMessage);
  }
  return result;
}


// const flatten = function (arr, result = []) {
//   for (let i = 0, length = arr.length; i < length; i++) {
//     const value = arr[i];
//     if (Array.isArray(value)) {
//       flatten(value, result);
//     } else {
//       result.push(value);
//     }
//   }
//   return result;
// };

exports.seed = function(knex, Promise) {
  console.log('Starting clock, seeding messages')
  console.time('messages time') // start timer
  
  return knex('messages').del()
  
    .then( function () {
      
      return knex.select('id').from('users').map( function (data) {
        return createMessage(data.id)
      })        
    })
    .then(function (messages) {
      return knex.batchInsert('messages', messages, 1000)
        .returning('id')
        .then( function (id) {
          console.log('messages batch inserted id: ', id)
        })
        .catch(function (err) {
          console.log(err)
        })
        
    })
    .then(function() {
      console.log('Stopping clock, done seeding messages')
      console.timeEnd('messages time')  // end timer    
    })
    .catch(function(err) {
      console.log(err)
    })
  
}


// STREAMING VERSION - not working

// exports.seed = function(knex, Promise) {
//   console.log('Starting clock, seeding messages')
//   console.time('message time') // start timer
  
//   return knex('messages').del()
  
//     .then( function () {
      
//       return knex.select('id').from('users')
        
        
//         .stream( function (stream) {
          
          
//           stream.on('data', function(chunk) {
//             console.log('this is the chunk......', chunk)
            
//             let formatted = createMessage(chunk.id)
            
//             console.log('this is the formatted....', formatted)
            
//             writeStream.write(formatted, function() {
//               console.log('formatted has been written to data.json', formatted)
//             })
            
//             return knex('messages').insert(formatted)  
//               .returning('id')
//               .then(function(id) {
              
//                 console.log('Insert success, id: ', id)
//               })
//               .catch(function(err) {
//               console.log(err)
//             })
            
            
//           })
              
              
          
          
//         }) 
        
      
      
//     })
//     .then(function() {
//       console.log('Stopping clock, done seeding messages')
//       console.timeEnd('messages time')  // end timer    
//     })
//     .catch(function(err) {
//       console.log(err)
//     })
  
// }


