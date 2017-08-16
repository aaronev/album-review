const router = require('express').Router()

router.use('/', require('./routes/home'))
router.use('/albums', require('./routes/albums'))
router.use('/reviews', require('./routes/reviews'))
router.use('/users', require('./routes/users'))
router.use('/sign-up', require('./routes/sign-up'))
router.use('/sign-in', require('./routes/sign-in'))
router.use('/sign-out', require('./routes/sign-out'))

module.exports = router
