const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
        validator: function (value) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: 'Invalid email format!'
    }
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    required: true,
    default: 1
  },
  contests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contest'
    }
  ],

  sightings : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sighting',
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User