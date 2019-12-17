// require Schema, model from mongoose module
const { Schema, model } = require('mongoose')
const { ObjectId } = Schema.Types

// create Product schema
const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  ageRange: {
    type: ObjectId,
    ref: 'AgeRange',
    required: true
  },
  brand: {
    type: ObjectId,
    ref: 'Brand',
    required: true
  },
  category: {
    type: ObjectId,
    ref: 'Category',
    required: true
  },
  delivOpt: {
    type: ObjectId,
    ref: 'DelivOpt',
    required: true
  },
  occasion: {
    type: ObjectId,
    ref: 'Occasion',
    required: true
  },
  toWhom: {
    type: ObjectId,
    ref: 'ToWhom',
    required: true
  }
})

// export module
module.exports = model('Product', ProductSchema)
