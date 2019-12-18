// require PRODUCT_PROPERTY config
const { MIN_VALUE, MAX_VALUE } = require('config').PRODUCT_PROPERTY
// require ToWhom model
const { ToWhom } = require('../../models')
// require error module
const { requireField, invalidField, alreadyCreated } = require('../../errors')

/**
 * postToWhoms function
 */
const postToWhoms = ({ body }, res, next) => {
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
  ToWhom
    .findOne({ value })
    .then(toWhom => {
      // ignore save if same value have been exist
      if (toWhom) {
        alreadyCreated(res, 'toWhom', value)
        return
      }

      // create new instance of ToWhom model and set new value
      const newToWhom = new ToWhom({ value })

      // save new ToWhom
      newToWhom
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
module.exports = { postToWhoms }
