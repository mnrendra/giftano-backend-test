// require express Router
const router = require('express').Router()
// require route modules
const home = require('./home')
// require error handlers
const { errorHandler, notFound } = require('./errors')

// routes middleware
router.use('/', home)
// error middleware
router.all('/*', notFound)
router.use(errorHandler)

module.exports = router
