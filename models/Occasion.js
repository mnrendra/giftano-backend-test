// require Schema, model from mongoose module
const { Schema, model } = require('mongoose')

// create Occasion schema
const OccasionSchema = new Schema({
  value: {
    type: String,
    required: true
  }
})

// export module
module.exports = model('Occasion', OccasionSchema)
