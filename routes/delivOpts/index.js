// require express Router
const router = require('express').Router()
// require get, post, put, delete, and error route modules
const { getDelivOpts, getDelivOptsById } = require('./get')
const { postDelivOpts } = require('./post')
const { putDelivOptsById } = require('./put')
const { deleteDelivOptsById } = require('./delete')
const { notAllowedMethod, requireId } = require('../../errors')

// GET request
router.get('/', getDelivOpts)
router.get('/:id', getDelivOptsById)
// POST request
router.post('/', postDelivOpts)
// PUT request
router.put('/', requireId)
router.put('/:id', putDelivOptsById)
// DELETE request
router.delete('/', requireId)
router.delete('/:id', deleteDelivOptsById)
// ALL request
router.all('/', notAllowedMethod)

// export module
module.exports = router
