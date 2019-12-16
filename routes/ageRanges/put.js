// require isValid from mongoose ObjectId Types
const { isValid } = require('mongoose').Types.ObjectId
// require AgeRange model
const { AgeRange } = require('../../models')
// require error handler
const { idInvalid, idNotFound } = require('../errors')

/**
 * putAgeRangesById function
 */
const putAgeRangesById = ({ params, body }, res, next) => {
  // desctructuring id parameter and value data
  const { id } = params
  const { value } = body

  // return false if id invalid
  if (!isValid(id)) {
    idInvalid(id, res)
    return
  }

  // check existing first
  AgeRange
    .findOne({ _id: id })
    .then(ageRange => {
      // return false if id not found
      if (!ageRange) {
        idNotFound(id, res)
        return
      }

      // prevent update if hase same value
      if (value === ageRange.value) {
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
      ageRange.value = value

      // save new changes
      ageRange
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
module.exports = { putAgeRangesById }
