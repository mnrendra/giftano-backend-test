// require isValid from mongoose ObjectId Types
const { isValid } = require('mongoose').Types.ObjectId
// require Occasion model
const { Occasion } = require('../../models')
// require error handler
const { invalidId, notFoundId } = require('../../errors')

/**
 * deleteOccasionsById function
 */
const deleteOccasionsById = ({ params }, res, next) => {
  // destructuring id parameter
  const { id } = params

  // return false if id is invalid
  if (!isValid(id)) {
    invalidId(res, id)
    return
  }

  // check existing first
  Occasion
    .findOne({ _id: id })
    .then(occasion => {
      // return false if id is not found
      if (!occasion) {
        notFoundId(res, id)
        return
      }

      // destructuring _id, value from occasion
      const { _id, value } = occasion

      // delete the document
      Occasion
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
module.exports = { deleteOccasionsById }
