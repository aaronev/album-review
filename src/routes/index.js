const router = require('express').Router()

router.use('/', require('./routers/home'))
router.use('/albums', require('./routers/albums'))
router.use('/reviews', require('./routers/reviews'))
router.use('/users', require('./routers/users'))
router.use('/sign-up', require('./routers/sign-up'))
router.use('/sign-in', require('./routers/sign-in'))
router.use('/sign-out', require('./routers/sign-out'))

module.exports = router