// require Schema, model from mongoose module
const { Schema, model } = require('mongoose')

// create AgeRange schema
const AgeRangeSchema = new Schema({
  value: {
    type: String,
    required: true
  }
})

// export module
module.exports = model('AgeRange', AgeRangeSchema)
