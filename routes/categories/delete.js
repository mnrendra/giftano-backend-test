// require isValid from mongoose ObjectId Types
const { isValid } = require('mongoose').Types.ObjectId
// require Category model
const { Category } = require('../../models')
// require error handler
const { invalidId, notFoundId } = require('../../errors')

/**
 * deleteCategoriesById function
 */
const deleteCategoriesById = ({ params }, res, next) => {
  // destructuring id parameter
  const { id } = params

  // return false if id is invalid
  if (!isValid(id)) {
    invalidId(res, id)
    return
  }

  // check existing first
  Category
    .findOne({ _id: id })
    .then(category => {
      // return false if id is not found
      if (!category) {
        notFoundId(res, id)
        return
      }

      // destructuring _id, value from category
      const { _id, value } = category

      // delete the document
      Category
        .deleteOne({ _id: id })
        .then(() => {
          res.status(200).json({
            status: 200,
            success: 'successfully deleted.',
            data: {
              id: _id,
              value
            }
          })
        }).catch(next)
    }).catch(next)
}

// export module
module.exports = { deleteCategoriesById }
