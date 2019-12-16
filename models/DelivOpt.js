// require Schema, model from mongoose module
const { Schema, model } = require('mongoose')

// create DelivOpt schema
const DelivOptSchema = new Schema({
  value: {
    type: String,
    required: true
  }
})

// export module
module.exports = model('DelivOpt', DelivOptSchema)
