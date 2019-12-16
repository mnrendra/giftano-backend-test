// require express Router
const router = require('express').Router()
// require get, post, put, delete, and error route modules
const { getBrands, getBrandsById } = require('./get')
const { postBrands } = require('./post')
const { putBrandsById } = require('./put')
const { deleteBrandsById } = require('./delete')
const { methodNotAllowed, idRequired } = require('../errors')

// GET request
router.get('/', getBrands)
router.get('/:id', getBrandsById)
// POST request
router.post('/', postBrands)
// PUT request
router.put('/', idRequired)
router.put('/:id', putBrandsById)
// DELETE request
router.delete('/', idRequired)
router.delete('/:id', deleteBrandsById)
// ALL request
router.all('/', methodNotAllowed)

// export module
module.exports = router
