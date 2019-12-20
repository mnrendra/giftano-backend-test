// require isValid from mongoose ObjectId Types
const { isValid } = require('mongoose').Types.ObjectId
// require PRODUCT_PROPERTY config
const { MIN_VALUE, MAX_VALUE } = require('config').PRODUCT_PROPERTY
// require AgeRange model
const { AgeRange } = require('../../models')
// require error handler
const { invalidId, invalidField, requireField, notFoundId, sameValue } = require('../../errors')

/**
 * putAgeRangesById function
 */
const putAgeRangesById = ({ params, body }, res, next) => {
  // desctructuring id parameter and value body field
  const { id } = params
  const { value } = body

  // return false if id is invalid
  if (!isValid(id)) {
    invalidId(res, id)
    return
  }

  /* validate body field */

  // validate value field
  if (!value) {
    requireField(res, 'value')
    return
  }
  // length value cannot be less than MIN_VALUE characters
  if (value.length < MIN_VALUE) {
    invalidField(res, `length value cannot be less than ${MIN_VALUE} characters`)
    return
  }
  // length value cannot be more than MAX_VALUE characters
  if (value.length > MAX_VALUE) {
    invalidField(res, `length value cannot be more than ${MAX_VALUE} characters`)
    return
  }

  /* check existing */

  // check existing first
  AgeRange
    .findOne({ _id: id })
    .then(ageRange => {
      // return false if id is not found
      if (!ageRange) {
        notFoundId(res, id)
        return
      }

      // ignore update if has same value
      if (value === ageRange.value) {
        sameValue(res)
        return
      }

      // update the value
      ageRange.value = value

      // save new changes
      ageRange
        .save()
        .then(() => {
          res.status(200).json({
            status: 200,
            success: {
              message: 'successfully update document!'
            }
          })
        }).catch(next)
    }).catch(next)
}

// export module
module.exports = { putAgeRangesById }
