const dbConfig = require('./config/dbConfig');
//const mysql = require('mysql')


module.exports = {

  client: 'mysql',
  connection: dbConfig,
  migrations: {
    directory: './database-mysql/migrations'
  },
  seeds: {
    directory: './database-mysql/seeds/dev'
  }
  
};
