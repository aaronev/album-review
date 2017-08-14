const router = require('express').Router()
const passport = require('../../config/authentication')

router.route('/sign-in')
  .get((req, res) => { 
    req.user
    ? res.redirect(`/users/${req.user.id}`)
    : res.render('sign-in')
  })
  .post(passport.authenticate('local', {
    successRedirect: '/sign-in',
    failureRedirect: '/sign-in',
    failureFlash: true
  }))

module.exports = router