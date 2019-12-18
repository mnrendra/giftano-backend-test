// require express Router
const router = require('express').Router()
// require get, post, put, delete, and error route modules
const { getAgeRanges, getAgeRangesById } = require('./get')
const { postAgeRanges } = require('./post')
const { putAgeRangesById } = require('./put')
const { deleteAgeRangesById } = require('./delete')
const { notAllowedMethod, requireId } = require('../../errors')

// GET request
router.get('/', getAgeRanges)
router.get('/:id', getAgeRangesById)
// POST request
router.post('/', postAgeRanges)
// PUT request
router.put('/', requireId)
router.put('/:id', putAgeRangesById)
// DELETE request
router.delete('/', requireId)
router.delete('/:id', deleteAgeRangesById)
// ALL request
router.all('/', notAllowedMethod)

// export module
module.exports = router
