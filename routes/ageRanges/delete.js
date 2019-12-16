// require isValid from mongoose ObjectId Types
const { isValid } = require('mongoose').Types.ObjectId
// require AgeRange model
const { AgeRange } = require('../../models')
// require error handler
const { idInvalid, idNotFound } = require('../errors')

// deleteAgeRangesById function
const deleteAgeRangesById = ({ params }, res, next) => {
  // destructuring id parameter
  const { id } = params

  // return false if id invalid
  if (!isValid(id)) {
    idInvalid(id, res)
    return
  }

  // check existing first
  AgeRange
    .findOne({ _id: id })
    .then(ageRange => {
      // return false if id not found
      if (!ageRange) {
        idNotFound(id, res)
        return
      }

      // destructuring _id, value from ageRange
      const { _id, value } = ageRange

      // delete the document
      AgeRange
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
module.exports = { deleteAgeRangesById }