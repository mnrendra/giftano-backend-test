// require isValid from mongoose ObjectId Types
const { isValid } = require('mongoose').Types.ObjectId
// require DelivOpt model
const { DelivOpt } = require('../../models')
// require error handler
const { invalidId, notFoundId } = require('../../errors')

/**
 * deleteDelivOptsById function
 */
const deleteDelivOptsById = ({ params }, res, next) => {
  // destructuring id parameter
  const { id } = params

  // return false if id is invalid
  if (!isValid(id)) {
    invalidId(res, id)
    return
  }

  // check existing first
  DelivOpt
    .findOne({ _id: id })
    .then(delivOpt => {
      // return false if id is not found
      if (!delivOpt) {
        notFoundId(res, id)
        return
      }

      // destructuring _id, value from delivOpt
      const { _id, value } = delivOpt

      // delete the document
      DelivOpt
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
module.exports = { deleteDelivOptsById }
