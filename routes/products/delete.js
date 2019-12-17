// require isValid from mongoose ObjectId Types
const { isValid } = require('mongoose').Types.ObjectId
// require Product model
const { Product } = require('../../models')
// require error handler
const { idInvalid, idNotFound } = require('../errors')

/**
 * deleteOccasionsById function
 */
const deleteProductsById = ({ params }, res, next) => {
  // destructuring id parameter
  const { id } = params

  // return false if id invalid
  if (!isValid(id)) {
    idInvalid(id, res)
    return
  }

  // check existing first
  Product
    .findOne({ _id: id })
    .then(product => {
      // return false if id not found
      if (!product) {
        idNotFound(id, res)
        return
      }

      // delete the document
      Product
        .deleteOne({ _id: id })
        .then(() => {
          res.status(200).json({
            status: 200,
            message: 'successfully delete product.',
            data: {
              _id: product._id,
              name: product.name
            }
          })
        }).catch(next)
    }).catch(next)
}

// export module
module.exports = { deleteProductsById }
