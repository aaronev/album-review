const router = require('express').Router()
const albums = require('../../domain/albums')
const reviews = require('../../domain/reviews')
const users = require('../../domain/users')
const passport = require('../../config/authentication')

router.get('/', (req, res, next) => {
  albums.all()
  .then( albums => {
    users.all()
    .then( users => {
      reviews.latest3()
      .then( reviews => {
        res.render('index', { albums, reviews, users })
      }).catch(next)
    }).catch(next)
  }).catch(next)
})

router.route('/sign-up')
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
        .then(addedUsers => { res.redirect('/authenticate/sign-in') })
        .catch(next)
      }
    }).catch(next)
  })

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

router.get('/sign-out', (req, res) => { 
  req.logout()
  res.redirect('/') 
})


module.exports = router