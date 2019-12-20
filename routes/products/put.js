// require isValid from mongoose ObjectId Types
const { isValid } = require('mongoose').Types.ObjectId
// require PRODUCT config
const { MIN_NAME, MAX_NAME, MIN_DESCRIPTION, MAX_DESCRIPTION, MIN_PRICE, MAX_PRICE, CURRENCY } = require('config').PRODUCT
// require Product model
const { Product } = require('../../models')
// require error handler
const { invalidField, invalidId, notFoundId } = require('../../errors')

/**
 * updateProductsById function
 */
const putProductsById = ({ params, body }, res, next) => {
  // destructuring id from params and option fields from body
  const { id } = params
  const { name, description, price, ageRange, brand, category, delivOpt, occasion, toWhom } = body

  // return false if id is invalid
  if (!isValid(id)) {
    invalidId(res, id)
    return
  }

  // create new _product object
  const _product = {}

  // validate name field
  if (name) {
    // name value cannot be less than MIN_NAME characters
    if (name.length < MIN_NAME) {
      invalidField(res, `name value cannot be less than ${MIN_NAME} characters`)
      return
    }
    // name value cannot be more than MAX_NAME characters
    if (name.length > MAX_NAME) {
      invalidField(res, `name value cannot be more than ${MAX_NAME} characters`)
      return
    }
    // update product name
    _product.name = name
  }

  // validate description field
  if (description) {
    // description value cannot be less than MIN_DESCRIPTION characters
    if (description.length < MIN_DESCRIPTION) {
      invalidField(res, `description value cannot be less than ${MIN_DESCRIPTION} characters`)
      return
    }
    // description value cannot be more than MAX_NAME characters
    if (description.length > MAX_DESCRIPTION) {
      invalidField(res, `description value cannot be more than ${MAX_DESCRIPTION} characters`)
      return
    }
    // update product description
    _product.description = description
  }

  // validate price field
  if (price) {
    // price value should be number
    if (!Number(price)) {
      invalidField(res, 'price value should be number!')
      return
    }
    // price value should be more than MIN_PRICE CURRENCY
    if (Number(price) <= MIN_PRICE) {
      invalidField(res, `price value should be more than ${MIN_PRICE} ${CURRENCY}`)
      return
    }
    // price field should be less than MAX_PRICE CURRENCY
    if (Number(price) >= MAX_PRICE) {
      invalidField(res, `price value should be less than ${MAX_PRICE} ${CURRENCY}`)
      return
    }
    // update product price
    _product.price = price
  }

  // validate ageRange field
  if (ageRange) {
    // validate ageRangeId field and the value shoud be valid id
    if (!isValid(ageRange)) {
      invalidId(res, ageRange)
      return
    }
    // update product ageRange
    _product.ageRange = ageRange
  }

  // validate brand field
  if (brand) {
    // validate brandId field and the value shoud be valid id
    if (!isValid(brand)) {
      invalidId(res, brand)
      return
    }
    // update product brand
    _product.brand = brand
  }

  // validate category field
  if (category) {
    // validate categoryId field and the value shoud be valid id
    if (!isValid(category)) {
      invalidId(res, category)
      return
    }
    // update product category
    _product.category = category
  }

  // validate delivOpt field
  if (delivOpt) {
    // validate delivOptId field and the value shoud be valid id
    if (!isValid(delivOpt)) {
      invalidId(res, delivOpt)
      return
    }
    // update product delivOpt
    _product.delivOpt = delivOpt
  }

  // validate occasion field
  if (occasion) {
    // validate occasionId field and the value shoud be valid id
    if (!isValid(occasion)) {
      invalidId(res, occasion)
      return
    }
    // update product occasion
    _product.occasion = occasion
  }

  // validate toWhom field
  if (toWhom) {
    // validate toWhomId field and the value shoud be valid id
    if (!isValid(toWhom)) {
      invalidId(res, toWhom)
      return
    }
    // update product toWhom
    _product.toWhom = toWhom
  }

  // check existing id first
  Product
    .findOne({ _id: id })
    .then(product => {
      // return false if product id is not found
      if (!product) {
        notFoundId(res, id)
        return
      }

      // update product from new _product object
      Object.keys(_product).map(key => {
        product[key] = _product[key]
      })

      // save updated document to databse
      product
        .save()
        .then(({ _id, name, description, price, ageRange, brand, category, delivOpt, occasion, toWhom }) => {
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
module.exports = { putProductsById }
