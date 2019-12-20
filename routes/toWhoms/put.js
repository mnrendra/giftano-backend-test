// require isValid from mongoose ObjectId Types
const { isValid } = require('mongoose').Types.ObjectId
// require PRODUCT_PROPERTY config
const { MIN_VALUE, MAX_VALUE } = require('config').PRODUCT_PROPERTY
// require ToWhom model
const { ToWhom } = require('../../models')
// require error handler
const { invalidId, invalidField, requireField, notFoundId, sameValue } = require('../../errors')

/**
 * putToWhomsById function
 */
const putToWhomsById = ({ params, body }, res, next) => {
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
  ToWhom
    .findOne({ _id: id })
    .then(toWhom => {
      // return false if id is not found
      if (!toWhom) {
        notFoundId(res, id)
        return
      }

      // ignore update if has same value
      if (value === toWhom.value) {
        sameValue(res)
        return
      }

      // update the value
      toWhom.value = value

      // save new changes
      toWhom
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
module.exports = { putToWhomsById }
