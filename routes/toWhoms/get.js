// require isValid from mongoose ObjectId Types
const { isValid } = require('mongoose').Types.ObjectId
// require ToWhom model
const { ToWhom } = require('../../models')
// require error handler
const { invalidId, notFoundId } = require('../../errors')

/**
 * getToWhoms function
 */
const getToWhoms = (req, res, next) => {
  // find all ToWhoms
  ToWhom
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
    }).catch(next)
}

/**
 * getToWhomsById function
 */
const getToWhomsById = ({ params }, res, next) => {
  // destructuring id parameter
  const { id } = params

  // return false if id is invalid
  if (!isValid(id)) {
    invalidId(res, id)
    return
  }

  // check existing first
  ToWhom
    .findOne({ _id: id })
    .then(data => {
      // return false if id is not found
      if (!data) {
        notFoundId(res, id)
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
    }).catch(next)
}

// export module
module.exports = { getToWhoms, getToWhomsById }
