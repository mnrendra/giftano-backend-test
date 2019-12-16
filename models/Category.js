// require Schema, model from mongoose module
const { Schema, model } = require('mongoose')

// create Category schema
const CategorySchema = new Schema({
  value: {
    type: String,
    required: true
  }
})

// export module
module.exports = model('Category', CategorySchema)
