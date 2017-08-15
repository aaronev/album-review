const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const users = require('../domain/users')

passport.serializeUser((user, done) => { 
  done(null, user.id) 
})

passport.deserializeUser((id, done) => {
  console.log('4. it get deserializeUser', id)
  users.findByID(id)
  .then(user => done(null, user)) 
})

passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password', 
    passReqToCallback: true
  }, 
  (req, email, plainTextPassword, done) => {
    users.findByEmail(email)
    .then(user => {
      if (!user) {
        return done(null, false, req.flash(
          'errorLogin', 
          'Email not found, please sign up!'
          ))
      } else {
        return users.toVerifyPassword(
          plainTextPassword, user.password
        )
        ? done(null, user)
        : done(null, false, req.flash(
            'errorLogin', 
            'Incorrect password!'
        ))
      }
    })
  }
))

module.exports = passport