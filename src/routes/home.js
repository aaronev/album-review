const router = require('express').Router()
const albums = require('../../domain/albums')
const reviews = require('../../domain/reviews')
const users = require('../../domain/users')

router.get('/', (req, res, next) => {
  albums.all()
  .then( albums => {
    res.send(albums)
    // users.all()
    // .then( users => {
    //   reviews.latest3()
    //   .then( reviews => {
    //     res.send(albums)
    //   }).catch(next)
    // }).catch(next)
  }).catch(next)
})

module.exports = router