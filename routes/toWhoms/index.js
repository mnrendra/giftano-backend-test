// require express Router
const router = require('express').Router()
// require get, post, put, delete, and error route modules
const { getToWhoms, getToWhomsById } = require('./get')
const { postToWhoms } = require('./post')
const { putToWhomsById } = require('./put')
const { deleteToWhomsById } = require('./delete')
const { methodNotAllowed, idRequired } = require('../errors')

// GET request
router.get('/', getToWhoms)
router.get('/:id', getToWhomsById)
// POST request
router.post('/', postToWhoms)
// PUT request
router.put('/', idRequired)
router.put('/:id', putToWhomsById)
// DELETE request
router.delete('/', idRequired)
router.delete('/:id', deleteToWhomsById)
// ALL request
router.all('/', methodNotAllowed)

// export module
module.exports = router
