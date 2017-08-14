const router = require('express').Router()
const albums = require('../../domain/albums')
const reviews = require('../../domain/reviews')
const users = require('../../domain/users')

router.get('/:id', (req, res, next) => {
  albums.all()
  .then( albums => {
    users.findByID(req.params.id)
    .then( user => {
      ! user 
      ? res.render('./errors/not-found') 
      : reviews.findByUserID(req.params.id)
      .then( reviews => {
        res.render('user-profile', { albums, reviews, user })
      }).catch(next)
    }).catch(next)
  }).catch(next)
})

module.exports = router