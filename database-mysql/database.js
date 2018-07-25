
const knex = require('knex')(require('../knexfile'));

const bookshelf = require('bookshelf')(knex);

//bookshelf.plugin('registry'); // Resolve circular dependencies with relations Model Registry plugin


module.exports.bookshelf = bookshelf;