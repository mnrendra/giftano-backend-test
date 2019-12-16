// require Schema, model from mongoose module
const { Schema, model } = require('mongoose')

// create ToWhom schema
const ToWhomSchema = new Schema({
  value: {
    type: String,
    required: true
  }
})

// export module
module.exports = model('ToWhom', ToWhomSchema)
