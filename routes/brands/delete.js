// require isValid from mongoose ObjectId Types
const { isValid } = require('mongoose').Types.ObjectId
// require Brand model
const { Brand } = require('../../models')
// require error handler
const { idInvalid, idNotFound } = require('../errors')

// deleteBrandsById function
const deleteBrandsById = ({ params }, res, next) => {
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
    .then(brand => {
      // return false if id not found
      if (!brand) {
        idNotFound(id, res)
        return
      }

      // destructuring _id, value from brand
      const { _id, value } = brand

      // delete the document
      Brand
        .deleteOne({ _id: id })
        .then(() => {
          res.status(200).json({
            status: 200,
            success: 'successfully deleted.',
            data: {
              id: _id,
              value
            }
          })
        })
        .catch(next)
    })
    .catch(next)
}

// export module
module.exports = { deleteBrandsById }
