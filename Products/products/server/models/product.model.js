const mongoose = require('mongoose');

console.log('loading product model');

const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Products must contain a Name'],
    minlength: [3, 'Name must be at least 3 characters']
  },
  quantity: {
    type: Number,
    required: [true, 'Product must contain a Qty'],
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'Product must contain a Price'],
    default: 0,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);
