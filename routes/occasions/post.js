// require PRODUCT_PROPERTY config
const { MIN_VALUE, MAX_VALUE } = require('config').PRODUCT_PROPERTY
// require Occasion model
const { Occasion } = require('../../models')
// require error module
const { requireField, invalidField, alreadyCreated } = require('../../errors')

/**
 * postOccasions function
 */
const postOccasions = ({ body }, res, next) => {
  // destructuring value data from body field
  const { value } = body

  /* validating body fields */

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

  /* check existing first */

  // check existing first
  Occasion
    .findOne({ value })
    .then(occasion => {
      // ignore save if same value have been exist
      if (occasion) {
        alreadyCreated(res, 'occasion', value)
        return
      }

      // create new instance of Occasion model and set new value
      const newOccasion = new Occasion({ value })

      // save new Occasion
      newOccasion
        .save()
        .then(() => {
          res.status(200).json({
            status: 200,
            success: {
              message: 'successfully create new document!'
            }
          })
        }).catch(next)
    }).catch(next)
}

// export module
module.exports = { postOccasions }
