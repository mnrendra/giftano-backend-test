// require isValid from mongoose ObjectId Types
const { isValid } = require('mongoose').Types.ObjectId
// require ToWhom model
const { ToWhom } = require('../../models')
// require error handler
const { invalidId, notFoundId } = require('../../errors')

/**
 * deleteToWhomsById function
 */
const deleteToWhomsById = ({ params }, res, next) => {
  // destructuring id parameter
  const { id } = params

  // return false if id is invalid
  if (!isValid(id)) {
    invalidId(res, id)
    return
  }

  // check existing first
  ToWhom
    .findOne({ _id: id })
    .then(toWhom => {
      // return false if id is not found
      if (!toWhom) {
        notFoundId(res, id)
        return
      }

      // delete the document
      ToWhom
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
module.exports = { deleteToWhomsById }
