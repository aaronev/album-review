const router = require('express').Router()
const reviews = require('../../domain/reviews')

router.delete('/:id', (req, res, next) => {
  ! req.user
  ? res.redirect('/authenticate/sign-up')
  : reviews.delete(req.params.id).catch(next)
})

module.exports = router