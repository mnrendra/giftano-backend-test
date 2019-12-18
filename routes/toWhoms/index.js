// require express Router
const router = require('express').Router()
// require get, post, put, delete, and error route modules
const { getToWhoms, getToWhomsById } = require('./get')
const { postToWhoms } = require('./post')
const { putToWhomsById } = require('./put')
const { deleteToWhomsById } = require('./delete')
const { notAllowedMethod, requireId } = require('../../errors')

// GET request
router.get('/', getToWhoms)
router.get('/:id', getToWhomsById)
// POST request
router.post('/', postToWhoms)
// PUT request
router.put('/', requireId)
router.put('/:id', putToWhomsById)
// DELETE request
router.delete('/', requireId)
router.delete('/:id', deleteToWhomsById)
// ALL request
router.all('/', notAllowedMethod)

// export module
module.exports = router
