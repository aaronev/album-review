const bcrypt = require('bcrypt')
const DBTable = require('../database/database')
const DBUsers = new DBTable('users', ['name', 'email', 'password', 'image'])

const users = {}

function encrypt(plainText) {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(plainText, salt)
}

users.toVerifyPassword = (plainText, hashedText) =>
  bcrypt.compareSync(plainText, hashedText)

users.all = () => 
  DBUsers.all()

users.create = (name, email, password, image) =>
  DBUsers.insert([name, email, encrypt(password), image])

users.findByID = (ID) => 
  DBUsers.find('id', ID).then(user => user[0])

users.findByEmail = (email) => 
  DBUsers.find('email', email).then(user => user[0])

module.exports = users