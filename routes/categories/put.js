// require isValid from mongoose ObjectId Types
const { isValid } = require('mongoose').Types.ObjectId
// require Category model
const { Category } = require('../../models')
// require error handler
const { idInvalid, idNotFound } = require('../errors')

/**
 * putCategoriesById function
 */
const putCategoriesById = ({ params, body }, res, next) => {
  // desctructuring id parameter and value data
  const { id } = params
  const { value } = body

  // return false if id invalid
  if (!isValid(id)) {
    idInvalid(id, res)
    return
  }

  // check existing first
  Category
    .findOne({ _id: id })
    .then(category => {
      // return false if id not found
      if (!category) {
        idNotFound(id, res)
        return
      }

      // prevent update if hase same value
      if (value === category.value) {
        res.status(400).json({
          status: 400,
          error: {
            name: 'same value!',
            message: 'data value is same.'
          }
        })
        return
      }

      // update the value
      category.value = value

      // save new changes
      category
        .save()
        .then(({ _id, value }) => {
          res.status(200).json({
            status: 200,
            success: 'successfully updated!',
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
module.exports = { putCategoriesById }
