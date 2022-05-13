const mongoose = require('mongoose');
const { Schema } = mongoose;

const MongooseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required!'],
    },
    description: {
      type: String,
      required: [true, 'Description is required!'],
    },
    done: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User id is required!'],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Todo', MongooseSchema);
