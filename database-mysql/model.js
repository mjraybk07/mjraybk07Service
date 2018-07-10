const bookshelf = require('./database').bookshelf



// -- models ---

const Account = bookshelf.Model.extend({
  tableName: 'accounts',
  hasTimestamps: true,
  accountOverviews: function () {
    return this.hasMany(AccountOverview)
  },
  cases: function () {
    return this.hasMany(Case)
  },
  users: function () {
    return this.hasMany(User)
  },
  messages: function () {
    return this.hasMany(Message)
  }
    
})

const AccountOverview = bookshelf.Model.extend({
  tableName: 'accountOverviews',
  hasTimestamps: true,
  account: function () {
    return this.belongsTo(Account);
  }
  
})

const Case = bookshelf.Model.extend({
  tableName: 'cases',
  hasTimestamps: true,
  messages: function () {
    return this.hasMany(Message)
  },
  users: function () {
    return this.hasMany(User)
  },
  account: function () {
    return this.belongsTo(Account)
  }
}) 


const User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  account: function () {
    return this.belongsTo(Account)
  },
  case: function () {
    return this.hasMany(Case)
  },
  messages: function () {
    return this.hasMany(Messages)
  }
  
})

const Message = bookshelf.Model.extend({
  tableName: 'messages',
  hasTimestamps: true,
  case: function() {
    return this.belongsTo(Account)
  },
  users: function() {
    return this.hasMany(users)
  }
  
})




// --- collections ---
  
const Accounts = bookshelf.Collection.extend({
  model: Account
})

const AccountOverviews = bookshelf.Collection.extend({
  model: AccountOverview
})

const Cases = bookshelf.Collection.extend({
  model: Case
})

const Users = bookshelf.Collection.extend({
  model: User
})


const Messages = bookshelf.Collection.extend({
  model: Message
})




module.exports = {
  Account: Account,
  AccountOverview: AccountOverview,
  Case: Case,
  User: User,
  Message: Message,
  Accounts: Accounts,
  AccountOverviews: AccountOverviews,
  Cases: Cases,
  Users: Users,
  Messages: Messages
}