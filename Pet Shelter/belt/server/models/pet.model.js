const mongoose = require('mongoose');

console.log('loading pet model');

const { Schema } = mongoose;

const PetSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'The pet must have a name'],
    minlength: [3, 'Name must be at least 3 characters']
  },
  type: {
    type: String,
    required: [true, 'Pet type is required'],
    trim: true,
    minlength: [3, 'Name must be at least 3 characters']
  },
  description: {
    type: String,
    required: [true, 'Pet description is required'],
    trim: true,
    minlength: [3, 'Name must be at least 3 characters']
  },
  skill1: {
    type: String,
    trim: true
  },
  skill2: {
    type: String,
    trim: true
  },
  skill3: {
    type: String,
    trim: true
  },
  numberOfLikes: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Pet', PetSchema);
