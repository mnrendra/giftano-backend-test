// require express Router
const router = require('express').Router()
// require route modules
const home = require('./home')
const ageRanges = require('./ageRanges')
const brands = require('./brands')
const categories = require('./categories')
const delivOpts = require('./delivOpts')
const occasions = require('./occasions')
const toWhoms = require('./toWhoms')
const products = require('./products')
// require error handlers
const { errorHandler, notFound } = require('./errors')

// routes middleware
router.use('/', home)
router.use('/ageranges', ageRanges)
router.use('/brands', brands)
router.use('/categories', categories)
router.use('/delivopts', delivOpts)
router.use('/occasions', occasions)
router.use('/towhoms', toWhoms)
router.use('/products', products)
// error middleware
router.use('/*', notFound)
router.use(errorHandler)

// export module
module.exports = router
