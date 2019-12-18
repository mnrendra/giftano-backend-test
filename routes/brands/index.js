// require express Router
const router = require('express').Router()
// require get, post, put, delete, and error route modules
const { getBrands, getBrandsById } = require('./get')
const { postBrands } = require('./post')
const { putBrandsById } = require('./put')
const { deleteBrandsById } = require('./delete')
const { notAllowedMethod, requireId } = require('../../errors')

// GET request
router.get('/', getBrands)
router.get('/:id', getBrandsById)
// POST request
router.post('/', postBrands)
// PUT request
router.put('/', requireId)
router.put('/:id', putBrandsById)
// DELETE request
router.delete('/', requireId)
router.delete('/:id', deleteBrandsById)
// ALL request
router.all('/', notAllowedMethod)

// export module
module.exports = router
