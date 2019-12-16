// require express Router
const router = require('express').Router()
// require route modules
const home = require('./home')
const ageRanges = require('./ageRanges')
// require error handlers
const { errorHandler, notFound } = require('./errors')

// routes middleware
router.use('/', home)
router.use('/ageranges', ageRanges)
// error middleware
router.use('/*', notFound)
router.use(errorHandler)

// export module
module.exports = router
