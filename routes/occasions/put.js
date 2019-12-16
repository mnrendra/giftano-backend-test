// require isValid from mongoose ObjectId Types
const { isValid } = require('mongoose').Types.ObjectId
// require Occasion model
const { Occasion } = require('../../models')
// require error handler
const { idInvalid, idNotFound } = require('../errors')

/**
 * putOccasionsById function
 */
const putOccasionsById = ({ params, body }, res, next) => {
  // desctructuring id parameter and value data
  const { id } = params
  const { value } = body

  // return false if id invalid
  if (!isValid(id)) {
    idInvalid(id, res)
    return
  }

  // check existing first
  Occasion
    .findOne({ _id: id })
    .then(occasion => {
      // return false if id not found
      if (!occasion) {
        idNotFound(id, res)
        return
      }

      // prevent update if hase same value
      if (value === occasion.value) {
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
      occasion.value = value

      // save new changes
      occasion
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
module.exports = { putOccasionsById }
