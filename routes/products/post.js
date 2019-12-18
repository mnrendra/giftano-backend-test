// require isValid from mongoose ObjectId Types
const { isValid } = require('mongoose').Types.ObjectId
// require PRODUCT config
const { MIN_NAME, MAX_NAME, MIN_DESCRIPTION, MAX_DESCRIPTION, MIN_PRICE, MAX_PRICE, CURRENCY } = require('config').PRODUCT
// require requirement models
const { AgeRange, Brand, Category, DelivOpt, Occasion, Product, ToWhom } = require('../../models')
// require error handler
const { requireField, invalidField, notFoundId, alreadyCreated } = require('../../errors')

/**
  * postProducts function
  */
const postProducts = ({ body }, res, next) => {
  // destructuring requirement fields
  const { name, description, price, ageRangeId, brandId, categoryId, delivOptId, occasionId, toWhomId } = body

  /* validating body fields */

  // validate name field
  if (!name) {
    requireField(res, 'name')
    return
  }
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

  // validate description field
  if (!description) {
    requireField(res, 'description')
    return
  }
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

  // validate price field and the value should be number
  if (!Number(price)) {
    requireField(res, 'price', 'value should be number!')
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

  // validate ageRangeId field and the value shoud be valid id
  if (!isValid(ageRangeId)) {
    requireField(res, 'ageRangeId', 'value should be valid id')
    return
  }
  // validate brandId field and the value shoud be valid id
  if (!isValid(brandId)) {
    requireField(res, 'brandId', 'value should be valid id')
    return
  }
  // validate categoryId field and the value shoud be valid id
  if (!isValid(categoryId)) {
    requireField(res, 'categoryId', 'value should be valid id')
    return
  }
  // validate delivOptId field and the value shoud be valid id
  if (!isValid(delivOptId)) {
    requireField(res, 'delivOptId', 'value should be valid id')
    return
  }
  // validate occasionId field and the value shoud be valid id
  if (!isValid(occasionId)) {
    requireField(res, 'occasionId', 'value should be valid id')
    return
  }
  // validate toWhomId field and the value shoud be valid id
  if (!isValid(toWhomId)) {
    requireField(res, 'toWhom', 'value should be valid id')
    return
  }

  /* check existing first */

  // check existing of product name, ageRange, brand, category, delivOpt, occasion, and toWhom id
  Promise.all([
    Product.findOne({ name }),
    AgeRange.findOne({ _id: ageRangeId }),
    Brand.findOne({ _id: brandId }),
    Category.findOne({ _id: categoryId }),
    DelivOpt.findOne({ _id: delivOptId }),
    Occasion.findOne({ _id: occasionId }),
    ToWhom.findOne({ _id: toWhomId })
  ]).then(docs => {
    // shifting first index as product document
    const product = docs.shift()

    // ignore save if same product name have been created
    if (product) {
      alreadyCreated(res, 'product', name)
      return
    }

    // assign properties object
    const properties = {}
    let i = 0
    // filtering properties
    docs.filter(doc => {
      // return false if one of properties id is not found
      if (!doc) {
        notFoundId(res, ['ageRangeId', 'brandId', 'categoryId', 'delivOptId', 'occasionId', 'toWhomId'][i])
        return
      }
      // assign property value
      properties[doc] = doc.value
      i++
    })

    // create new Product model and set new value
    const newProduct = new Product({
      name,
      description,
      price,
      ageRange: ageRangeId,
      brand: brandId,
      category: categoryId,
      delivOpt: delivOptId,
      occasion: occasionId,
      toWhom: toWhomId
    })

    // save new Product
    newProduct
      .save()
      .then(({ _id, name, description, price }) => {
        res.status(200).json({
          status: 200,
          success: 'successfully create new product!',
          data: {
            id: _id,
            name,
            description,
            price,
            ageRange: properties.ageRange,
            brand: properties.brand,
            category: properties.category,
            delivOpt: properties.delivOpt,
            occasion: properties.occasion,
            toWhom: properties.toWhom
          }
        })
      }).catch(next)
  }).catch(next)
}

// export module
module.exports = { postProducts }
