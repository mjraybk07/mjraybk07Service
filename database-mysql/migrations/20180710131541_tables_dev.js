
exports.up = function(knex, Promise) {
  return Promise.all([
    
    knex.schema
    .createTable('accounts', function(table) {
      table.increments('id').primary();
      table.timestamps();
      table.string('companyName');
      table.string('location');
      table.string('description'); 
      table.integer('npsScoreCURRENT');
      table.integer('npsScorePREDICTED');
    }),
    
    knex.schema
    .createTable('accountOverviews', function(table) {
      table.increments('id').primary();
      table.timestamps();
      table.date('start_date');
      table.date('end_date');
      table.integer('account_id')
        .references('id')
        .inTable('accounts')
        .unsigned()
        .onDelete('CASCADE')
        .index();
      table.integer('npsScoreCURRENT');
      table.integer('npsScorePREDICTED');
      table.integer('numberOfCases');
      table.integer('numberOfUsers');
      table.integer('numberOfMessages');
      table.integer('averageTimeToMessageResponse');
      table.integer('averageTimeToCaseResolution');
    }),
    
    knex.schema
    .createTable('cases', function(table) {
      table.increments('id').primary();
      table.timestamps();
      table.dateTime('resolved_at');
      table.integer('account_id')
        .references('id')
        .inTable('accounts')
        .unsigned()
        .onDelete('CASCADE')
        .index();
      table.string('title');
      table.string('text');
      table.integer('npsScoreCURRENT');
      table.integer('npsScorePREDICTED');
      table.boolean('resolved');
    }),
    
    knex.schema
    .createTable('users', function(table) {
      table.increments('id').primary();
      table.timestamps();
      table.integer('account_id')
        .references('id')
        .inTable('accounts')
        .unsigned()
        .onDelete('CASCADE')
        .index();      
      table.string('userName');
      table.string('jobTitle');
      table.string('jobType');
      table.string('phoneNumber');
      table.string('email');
    }),
    
    knex.schema
    .createTable('messages', function(table) {
      table.increments('id').primary();
      table.timestamps();
      table.integer('user_id')
        .references('id')
        .inTable('users')
        .unsigned()
        .onDelete('CASCADE')
        .index();
      table.string('subject');
      table.string('message');
    })
    
    
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all ([
    
    knex.schema.dropTable('accountOverviews'),
    knex.schema.dropTable('messages'),
    knex.schema.dropTable('users'),
    knex.schema.dropTable('cases'),
    knex.schema.dropTable('accounts')
    
  ])
  
};