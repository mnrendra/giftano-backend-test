// require isValid from mongoose ObjectId Types
const { isValid } = require('mongoose').Types.ObjectId
// require ToWhom model
const { ToWhom } = require('../../models')
// require error handler
const { idInvalid, idNotFound } = require('../errors')

/**
 * putToWhomsById function
 */
const putToWhomsById = ({ params, body }, res, next) => {
  // desctructuring id parameter and value data
  const { id } = params
  const { value } = body

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

      // prevent update if hase same value
      if (value === toWhom.value) {
        res.status(400).json({
          status: 400,
          error: {
            name: 'same value!',
            message: 'data value is same.'
          }
        })
        return
      }

      // update the value
      toWhom.value = value

      // save new changes
      toWhom
        .save()
        .then(({ _id, value }) => {
          res.status(200).json({
            status: 200,
            success: 'successfully updated!',
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
module.exports = { putToWhomsById }
