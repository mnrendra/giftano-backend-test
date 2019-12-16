// require Brand model
const { Brand } = require('../../models')

/**
 * postBrands function
 */
const postBrands = ({ body }, res, next) => {
  // destructuring value data from body
  const { value } = body

  // check existing first
  Brand
    .findOne({ value })
    .then(brand => {
      // return false if same value have been exist
      if (brand) {
        res.status(400).json({
          status: 400,
          error: {
            name: 'have been created!',
            message: 'please create another one or delete this one.'
          }
        })
        return
      }

      // create new instance of Brand model and set new value
      const newBrand = new Brand({ value })

      // save new Brand
      newBrand
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
module.exports = { postBrands }
