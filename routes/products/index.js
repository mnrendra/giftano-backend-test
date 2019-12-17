// require express Router
const router = require('express').Router()
// require get, post, put, delete, and error route modules
// const { getProducts, getProductsById } = require('./get')
const { postProducts } = require('./post')
// const { putProductsById } = require('./put')
// const { deleteProductsById } = require('./delete')
// const { methodNotAllowed, idRequired } = require('../errors')

// GET request
// router.get('/', getProducts)
// router.get('/:id', getProductsById)
// POST request
router.post('/', postProducts)
// PUT request
// router.put('/', idRequired)
// router.put('/:id', putProductsById)
// DELETE request
// router.delete('/', idRequired)
// router.delete('/:id', deleteProductsById)
// ALL request
// router.all('/', methodNotAllowed)

// export module
module.exports = router
