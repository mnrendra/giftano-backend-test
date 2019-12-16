// require express Router
const router = require('express').Router()
// require get, post, put, delete, and error route modules
const { getOccasions, getOccasionsById } = require('./get')
const { postOccasions } = require('./post')
const { putOccasionsById } = require('./put')
const { deleteOccasionsById } = require('./delete')
const { methodNotAllowed, idRequired } = require('../errors')

// GET request
router.get('/', getOccasions)
router.get('/:id', getOccasionsById)
// POST request
router.post('/', postOccasions)
// PUT request
router.put('/', idRequired)
router.put('/:id', putOccasionsById)
// DELETE request
router.delete('/', idRequired)
router.delete('/:id', deleteOccasionsById)
// ALL request
router.all('/', methodNotAllowed)

// export module
module.exports = router
