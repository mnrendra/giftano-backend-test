// require isValid from mongoose ObjectId Types
const { isValid } = require('mongoose').Types.ObjectId
// require PRODUCT_PROPERTY config
const { MIN_VALUE, MAX_VALUE } = require('config').PRODUCT_PROPERTY
// require Brand model
const { Brand } = require('../../models')
// require error handler
const { invalidId, invalidField, requireField, notFoundId, sameValue } = require('../../errors')

/**
 * putBrandsById function
 */
const putBrandsById = ({ params, body }, res, next) => {
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
  Brand
    .findOne({ _id: id })
    .then(brand => {
      // return false if id is not found
      if (!brand) {
        notFoundId(res, id)
        return
      }

      // ignore update if has same value
      if (value === brand.value) {
        sameValue(res)
        return
      }

      // update the value
      brand.value = value

      // save new changes
      brand
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
module.exports = { putBrandsById }
