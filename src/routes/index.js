const router = require('express').Router()

router.use('/', require('./routers/home'))
router.use('/albums', require('./routers/albums'))
router.use('/reviews', require('./routers/reviews'))
router.use('/users', require('./routers/users'))

module.exports = router