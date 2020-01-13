const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');
const bcryptjs =  require('bcryptjs');

console.log('loading user model');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      msg: '{VALUE} does not look like an email'
    }
  },
  password: {
    type: String,
    required: true,
  }
}, {
    timestamps: true
});

UserSchema.plugin(uniqueValidator, {message: '{PATH} is not unique'});

UserSchema.pre('validate', function (next) {
  if(!this.isModified('password')) {
    return next();
  }

  bcryptjs.hash(this.password, 10)
  .then(hashedPassword => {
    this.password = hashedPassword;
    next();
  }).catch(next);
});

UserSchema.static('validatePassword', function (candidatePassword, hashedPassword) {
  return bcryptjs.compare(candidatePassword, hashedPassword)
});

module.exports = mongoose.model('User', UserSchema);
