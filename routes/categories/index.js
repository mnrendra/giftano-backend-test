// require express Router
const router = require('express').Router()
// require get, post, put, delete, and error route modules
const { getCategories, getCategoriesById } = require('./get')
const { postCategories } = require('./post')
const { putCategoriesById } = require('./put')
const { deleteCategoriesById } = require('./delete')
const { notAllowedMethod, requireId } = require('../../errors')

// GET request
router.get('/', getCategories)
router.get('/:id', getCategoriesById)
// POST request
router.post('/', postCategories)
// PUT request
router.put('/', requireId)
router.put('/:id', putCategoriesById)
// DELETE request
router.delete('/', requireId)
router.delete('/:id', deleteCategoriesById)
// ALL request
router.all('/', notAllowedMethod)

// export module
module.exports = router
