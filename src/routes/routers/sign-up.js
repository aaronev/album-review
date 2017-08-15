const router = require('express').Router()
const users = require('../../domain/users')
const passport = require('../../config/authentication')

router.route('/')
  .get((req, res) => { 
    ! req.user
    ? res.render('sign-up') 
    : res.redirect(`/users/${req.user.id}`)
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
        .then(() => { 
          passport.authenticate('local')
          (req, res, () => {
            res.redirect('/sign-up')
          })
        }).catch(next)
      }
    }).catch(next)
  })

module.exports = router