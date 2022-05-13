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
    todoId: {
      type: Schema.Types.ObjectId,
      ref: 'Todo',
      required: [true, 'Todo id is required!'],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('SubTodo', MongooseSchema);
