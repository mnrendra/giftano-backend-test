// require express Router
const router = require('express').Router()
// require get, post, put, delete, and error route modules
const { getCategories, getCategoriesById } = require('./get')
const { postCategories } = require('./post')
const { putCategoriesById } = require('./put')
const { deleteCategoriesById } = require('./delete')
const { methodNotAllowed, idRequired } = require('../errors')

// GET request
router.get('/', getCategories)
router.get('/:id', getCategoriesById)
// POST request
router.post('/', postCategories)
// PUT request
router.put('/', idRequired)
router.put('/:id', putCategoriesById)
// DELETE request
router.delete('/', idRequired)
router.delete('/:id', deleteCategoriesById)
// ALL request
router.all('/', methodNotAllowed)

// export module
module.exports = router
