// require express Router
const router = require('express').Router()
// require get, post, put, delete, and error route modules
const { getAgeRanges, getAgeRangesById } = require('./get')
const { postAgeRanges } = require('./post')
const { putAgeRangesById } = require('./put')
const { deleteAgeRangesById } = require('./delete')
const { methodNotAllowed, idRequired } = require('../errors')

// GET request
router.get('/', getAgeRanges)
router.get('/:id', getAgeRangesById)
// POST request
router.post('/', postAgeRanges)
// PUT request
router.put('/', idRequired)
router.put('/:id', putAgeRangesById)
// DELETE request
router.delete('/', idRequired)
router.delete('/:id', deleteAgeRangesById)
// ALL request
router.all('/', methodNotAllowed)

// export module
module.exports = router
