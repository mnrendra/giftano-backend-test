// require express Router
const router = require('express').Router()
// require get, post, put, delete, and error route modules
const { getDelivOpts, getDelivOptsById } = require('./get')
const { postDelivOpts } = require('./post')
const { putDelivOptsById } = require('./put')
const { deleteDelivOptsById } = require('./delete')
const { methodNotAllowed, idRequired } = require('../errors')

// GET request
router.get('/', getDelivOpts)
router.get('/:id', getDelivOptsById)
// POST request
router.post('/', postDelivOpts)
// PUT request
router.put('/', idRequired)
router.put('/:id', putDelivOptsById)
// DELETE request
router.delete('/', idRequired)
router.delete('/:id', deleteDelivOptsById)
// ALL request
router.all('/', methodNotAllowed)

// export module
module.exports = router
