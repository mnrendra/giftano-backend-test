// require isValid from mongoose ObjectId Types
const { isValid } = require('mongoose').Types.ObjectId
// require Product model
const { Product } = require('../../models')
// require error handler
const { idInvalid, idNotFound } = require('../errors')

/**
 * updateProductsById function
 */
const putProductsById = ({ params, body }, res, next) => {
  const { id } = params
  const { name, description, price, ageRange, brand, category, delivOpt, occasion, toWhom } = body

  Product
    .findOne({ _id: id })
    .then(product => {
      if (!product) {
        idNotFound(id, res)
        return
      }
    }).catch(next)

  name && (product.name = name)
  description && (product.description = description)
  price && (price.currency && (product.price.currency = price.currency))
  price && (price.value && (product.price.value = price.value))
  age && (product.age = age)
  brand && (product.brand = brand)
  category && (product.category = category)
  deliveryOption && (product.deliveryOption = deliveryOption)
  occasion && (product.occasion = occasion)
  toWhom && (product.toWhom = toWhom)

  const data = await product.save()

  res.status(200).json({
    status: 200,
    message: 'successfully update product.',
    data
  }).catch(next)
}

module.exports = { putProductsById }
