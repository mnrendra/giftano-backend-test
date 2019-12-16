// require Occasion model
const { Occasion } = require('../../models')

/**
 * postOccasions function
 */
const postOccasions = ({ body }, res, next) => {
  // destructuring value data from body
  const { value } = body

  // check existing first
  Occasion
    .findOne({ value })
    .then(occasion => {
      // return false if same value have been exist
      if (occasion) {
        res.status(400).json({
          status: 400,
          error: {
            name: 'have been created!',
            message: 'please create another one or delete this one.'
          }
        })
        return
      }

      // create new instance of Occasion model and set new value
      const newOccasion = new Occasion({ value })

      // save new Occasion
      newOccasion
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
module.exports = { postOccasions }
