// require isValid from mongoose ObjectId Types
const { isValid } = require('mongoose').Types.ObjectId
// require ToWhom model
const { ToWhom } = require('../../models')
// require error handler
const { idInvalid, idNotFound } = require('../errors')

// deleteToWhomsById function
const deleteToWhomsById = ({ params }, res, next) => {
  // destructuring id parameter
  const { id } = params

  // return false if id invalid
  if (!isValid(id)) {
    idInvalid(id, res)
    return
  }

  // check existing first
  ToWhom
    .findOne({ _id: id })
    .then(toWhom => {
      // return false if id not found
      if (!toWhom) {
        idNotFound(id, res)
        return
      }

      // destructuring _id, value from toWhom
      const { _id, value } = toWhom

      // delete the document
      ToWhom
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
        })
        .catch(next)
    })
    .catch(next)
}

// export module
module.exports = { deleteToWhomsById }
