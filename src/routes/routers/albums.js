const router = require('express').Router()
const albums = require('../../domain/albums')
const reviews = require('../../domain/reviews')
const users = require('../../domain/users')

router.get('/:id', (req, res, next) => {
  albums.findByID(req.params.id)
  .then( album => {
    ! album
    ? res.render('./errors/not-found')
    : users.all()
    .then( users => {
      reviews.findByAlbumID(req.params.id)
      .then( reviews => {
        res.render('album-info', { album, reviews, users })
      }).catch(next)
    }).catch(next)
  }).catch(next)
})

router.route('/:id/reviews/new')
  .get((req, res) => {
    ! req.user
    ? res.redirect('/sign-up')
    : res.render('new-review')
  })
  .post((req, res, next) => {
    ! req.user
    ? res.redirect('/sign-up')
    : reviews.create(
        req.user.id, 
        req.params.id, 
        req.body.review
      ).then( reviews => {
        res.redirect(`/albums/${req.params.id}`)
    }).catch(next)
  })

module.exports = router