// require AgeRange model
const { AgeRange } = require('../../models')

/**
 * postAgeRanges function
 */
const postAgeRanges = ({ body }, res, next) => {
  // destructuring value data from body
  const { value } = body

  // check existing first
  AgeRange
    .findOne({ value })
    .then(ageRange => {
      // return false if same value have been exist
      if (ageRange) {
        res.status(400).json({
          status: 400,
          error: {
            name: 'have been created!',
            message: 'please create another one or delete this one.'
          }
        })
        return
      }

      // create new instance of AgeRange model and set new value
      const newAgeRange = new AgeRange({ value })

      // save new AgeRange
      newAgeRange
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
module.exports = { postAgeRanges }
