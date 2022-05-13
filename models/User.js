const mongoose = require('mongoose'),
  bcrypt = require('bcryptjs'),
  jwt = require('jsonwebtoken');

const MongooseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a name!'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please enter an email address!'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please enter a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

MongooseSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

MongooseSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

MongooseSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', MongooseSchema);
