// require DelivOpt model
const { DelivOpt } = require('../../models')

/**
 * postDelivOpts function
 */
const postDelivOpts = ({ body }, res, next) => {
  // destructuring value data from body
  const { value } = body

  // check existing first
  DelivOpt
    .findOne({ value })
    .then(delivOpt => {
      // return false if same value have been exist
      if (delivOpt) {
        res.status(400).json({
          status: 400,
          error: {
            name: 'have been created!',
            message: 'please create another one or delete this one.'
          }
        })
        return
      }

      // create new instance of DelivOpt model and set new value
      const newDelivOpt = new DelivOpt({ value })

      // save new DelivOpt
      newDelivOpt
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
        })
        .catch(next)
    })
    .catch(next)
}

// export module
module.exports = { postDelivOpts }
