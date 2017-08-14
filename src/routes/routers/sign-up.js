const router = require('express').Router()
const users = require('../../domain/users')

router.route('/')
  .get((req, res) => { 
    res.render('sign-up') 
  })
  .post((req, res, next) => {
    const {name, email, password} = req.body
    users.findByEmail(email)
    .then(foundEmail => {
      if (foundEmail) {
        req.flash('errorSignUp', 'Email already exist!')
        res.redirect('/sign-up')
      } else {
        users.create(name, email, password, '/img/no-dj.png')
        .then(addedUsers => { res.redirect('/sign-in') })
        .catch(next)
      }
    }).catch(next)
  })

  module.exports = router