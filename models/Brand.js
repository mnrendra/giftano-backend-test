// require Schema, model from mongoose module
const { Schema, model } = require('mongoose')

// create Brand schema
const BrandSchema = new Schema({
  value: {
    type: String,
    required: true
  }
})

// export module
module.exports = model('Brand', BrandSchema)
