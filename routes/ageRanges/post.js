// require PRODUCT_PROPERTY config
const { MIN_VALUE, MAX_VALUE } = require('config').PRODUCT_PROPERTY
// require AgeRange model
const { AgeRange } = require('../../models')
// require error module
const { requireField, invalidField, alreadyCreated } = require('../../errors')

/**
 * postAgeRanges function
 */
const postAgeRanges = ({ body }, res, next) => {
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
  AgeRange
    .findOne({ value })
    .then(ageRange => {
      // ignore save if same value have been exist
      if (ageRange) {
        alreadyCreated(res, 'ageRange', value)
        return
      }

      // create new instance of AgeRange model and set new value
      const newAgeRange = new AgeRange({ value })

      // save new AgeRange
      newAgeRange
        .save()
        .then(({ _id, value }) => {
          res.status(200).json({
            status: 200,
            success: 'successfully create new document!',
            data: {
              id: _id,
              value
            }
          })
        }).catch(next)
    }).catch(next)
}

// export module
module.exports = { postAgeRanges }
