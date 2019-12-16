// require Category model
const { Category } = require('../../models')

/**
 * postCategories function
 */
const postCategories = ({ body }, res, next) => {
  // destructuring value data from body
  const { value } = body

  // check existing first
  Category
    .findOne({ value })
    .then(category => {
      // return false if same value have been exist
      if (category) {
        res.status(400).json({
          status: 400,
          error: {
            name: 'have been created!',
            message: 'please create another one or delete this one.'
          }
        })
        return
      }

      // create new instance of Category model and set new value
      const newCategory = new Category({ value })

      // save new Category
      newCategory
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
module.exports = { postCategories }
