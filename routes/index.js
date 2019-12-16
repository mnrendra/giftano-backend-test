// require express Router
const router = require('express').Router()
// require route modules
const home = require('./home')
const ageRanges = require('./ageRanges')
const brands = require('./brands')
const categories = require('./categories')
const delivOpts = require('./delivOpts')
// require error handlers
const { errorHandler, notFound } = require('./errors')

// routes middleware
router.use('/', home)
router.use('/ageranges', ageRanges)
router.use('/brands', brands)
router.use('/categories', categories)
router.use('/delivopts', delivOpts)
// error middleware
router.use('/*', notFound)
router.use(errorHandler)

// export module
module.exports = router
