const router = require('express').Router()
const _albums = require('../../domain/albums')
const _reviews = require('../../domain/reviews')
const _users = require('../../domain/users')

router.get('/:id', (req, res, next) => {
  _albums.all()
    .then((albums) => {
      _users.findByID(req.params.id)
        .then((user) => {
          !user
            ? res.render('./errors/not-found')
            : _reviews.findByUserID(req.params.id)
              .then((reviews) => {
                res.render('user-profile', {albums, reviews, user})
              }).catch(next)
        }).catch(next)
    }).catch(next)
})

module.exports = router
