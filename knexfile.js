const dbConfig = require('./config/dbConfig');


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
