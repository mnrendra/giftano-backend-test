// require isValid from mongoose ObjectId Types
const { isValid } = require('mongoose').Types.ObjectId
// require Brand model
const { Brand } = require('../../models')
// require error handler
const { idInvalid, idNotFound } = require('../errors')

/**
 * getBrands function
 */
const getBrands = (req, res, next) => {
  // find all Brands
  Brand
    .find()
    .then(docs => {
      // normalize data and keep _id, _v keys
      const data = docs.map(({ _id, value }) => {
        return { id: _id, value }
      })

      // send back the data
      res.status(200).json({
        status: 200,
        data
      })
    })
    .catch(next)
}

/**
 * getBrandsById function
 */
const getBrandsById = ({ params }, res, next) => {
  // destructuring id parameter
  const { id } = params

  // return false if id invalid
  if (!isValid(id)) {
    idInvalid(id, res)
    return
  }

  // check existing first
  Brand
    .findOne({ _id: id })
    .then(data => {
      // return false if id not found
      if (!data) {
        idNotFound(id, res)
        return
      }

      // destructuring _id, value to normalize data and keep _id, _v keys
      const { _id, value } = data

      // send back the data
      res.status(200).json({
        status: 200,
        data: {
          id: _id,
          value
        }
      })
    })
    .catch(next)
}

// export module
module.exports = { getBrands, getBrandsById }
