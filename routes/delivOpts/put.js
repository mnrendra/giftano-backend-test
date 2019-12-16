// require isValid from mongoose ObjectId Types
const { isValid } = require('mongoose').Types.ObjectId
// require DelivOpt model
const { DelivOpt } = require('../../models')
// require error handler
const { idInvalid, idNotFound } = require('../errors')

/**
 * putDelivOptsById function
 */
const putDelivOptsById = ({ params, body }, res, next) => {
  // desctructuring id parameter and value data
  const { id } = params
  const { value } = body

  // return false if id invalid
  if (!isValid(id)) {
    idInvalid(id, res)
    return
  }

  // check existing first
  DelivOpt
    .findOne({ _id: id })
    .then(delivOpt => {
      // return false if id not found
      if (!delivOpt) {
        idNotFound(id, res)
        return
      }

      // prevent update if hase same value
      if (value === delivOpt.value) {
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
      delivOpt.value = value

      // save new changes
      delivOpt
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
module.exports = { putDelivOptsById }
