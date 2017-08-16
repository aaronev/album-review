const router = require('express').Router()

const _reviews = require('../../domain/reviews')

router.delete('/:id', (req, res, next) => {
  !req.user
    ? res.redirect('/authenticate/sign-up')
    : _reviews.delete(req.params.id).catch(next)
})

module.exports = router
