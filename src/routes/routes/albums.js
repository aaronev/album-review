const router = require('express').Router()
const _albums = require('../../domain/albums')
const _reviews = require('../../domain/reviews')
const _users = require('../../domain/users')

router.get('/:id', (req, res, next) => {
  _albums.findByID(req.params.id)
    .then((album) => {
      !album
        ? res.render('./errors/not-found')
        : _users.all()
          .then((users) => {
            _reviews.findByAlbumID(req.params.id)
              .then((reviews) => {
                res.render('album-info', {album, reviews, users})
              }).catch(next)
          }).catch(next)
    }).catch(next)
})

router.route('/:id/reviews/new')
  .get((req, res, next) => {
    _albums.findByID(req.params.id)
      .then((album) => {
        res.render('new-review', {album})
      }).catch(next)
  })
  .post((req, res, next) => {
    !req.user
      ? res.redirect('/sign-up')
      : _reviews.create(
        req.user.id,
        req.params.id,
        req.body.review
      ).then(() => {
        res.redirect(`/albums/${req.params.id}`)
      }).catch(next)
  })

module.exports = router
