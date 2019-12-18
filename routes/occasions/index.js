// require express Router
const router = require('express').Router()
// require get, post, put, delete, and error route modules
const { getOccasions, getOccasionsById } = require('./get')
const { postOccasions } = require('./post')
const { putOccasionsById } = require('./put')
const { deleteOccasionsById } = require('./delete')
const { notAllowedMethod, requireId } = require('../../errors')

// GET request
router.get('/', getOccasions)
router.get('/:id', getOccasionsById)
// POST request
router.post('/', postOccasions)
// PUT request
router.put('/', requireId)
router.put('/:id', putOccasionsById)
// DELETE request
router.delete('/', requireId)
router.delete('/:id', deleteOccasionsById)
// ALL request
router.all('/', notAllowedMethod)

// export module
module.exports = router
