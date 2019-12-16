// require ToWhom model
const { ToWhom } = require('../../models')

/**
 * postToWhoms function
 */
const postToWhoms = ({ body }, res, next) => {
  // destructuring value data from body
  const { value } = body

  // check existing first
  ToWhom
    .findOne({ value })
    .then(toWhom => {
      // return false if same value have been exist
      if (toWhom) {
        res.status(400).json({
          status: 400,
          error: {
            name: 'have been created!',
            message: 'please create another one or delete this one.'
          }
        })
        return
      }

      // create new instance of ToWhom model and set new value
      const newToWhom = new ToWhom({ value })

      // save new ToWhom
      newToWhom
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
module.exports = { postToWhoms }
