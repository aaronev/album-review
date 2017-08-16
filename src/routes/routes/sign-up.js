const router = require('express').Router()
const _users = require('../../domain/users')
const passport = require('../../config/authentication')

router.route('/')
  .get((req, res) => {
    !req.user
      ? res.render('sign-up')
      : res.redirect(`/users/${req.user.id}`)
  })
  .post((req, res, next) => {
    const {name, email, password} = req.body
    _users.findByEmail(email)
      .then((foundEmail) => {
        if (foundEmail) {
          req.flash('errorSignUp', 'Email already exist!')
          res.redirect('/sign-up')
        } else {
          _users.create(name, email, password, '/img/no-dj.png')
            .then(() => { next() }).catch(next)
        }
      }).catch(next)
  }, passport.authenticate('local'),
  (req, res) => {
    res.redirect('/sign-up')
  })

module.exports = router
