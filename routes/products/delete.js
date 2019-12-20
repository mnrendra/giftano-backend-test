// require isValid from mongoose ObjectId Types
const { isValid } = require('mongoose').Types.ObjectId
// require Product model
const { Product } = require('../../models')
// require error handler
const { invalidId, notFoundId } = require('../../errors')

/**
 * deleteOccasionsById function
 */
const deleteProductsById = ({ params }, res, next) => {
  // destructuring id parameter
  const { id } = params

  // return false if id invalid
  if (!isValid(id)) {
    invalidId(res, id)
    return
  }

  // check existing first
  Product
    .findOne({ _id: id })
    .then(product => {
      // return false if id is not found
      if (!product) {
        notFoundId(id, res)
        return
      }

      // delete the document
      Product
        .deleteOne({ _id: id })
        .then(() => {
          res.status(200).json({
            status: 200,
            success: {
              message: 'successfully delete document!'
            }
          })
        }).catch(next)
    }).catch(next)
}

// export module
module.exports = { deleteProductsById }
