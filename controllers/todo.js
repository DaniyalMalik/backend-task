const Todo = require('../models/Todo');

exports.getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find().sort('-createdAt').populate('userId');

    if (!todos) {
      return res.json({
        success: false,
        message: 'No Todo items found!',
      });
    }

    res.json({
      success: true,
      todos,
    });
  } catch (error) {
    console.log(error);

    res.json({ success: false, message: 'No Todo items found!' });
  }
};

exports.getTodosByUserId = async (req, res, next) => {
  try {
    const { userId } = req.query;
    const todos = await Todo.find({ userId })
      .sort('-createdAt')
      .populate('userId');

    if (!todos) {
      return res.json({
        success: false,
        message: 'No Todo items found!',
      });
    }

    res.json({
      success: true,
      todos,
    });
  } catch (error) {
    console.log(error);

    res.json({ success: false, message: 'No Todo items found!' });
  }
};

exports.addTodo = async (req, res, next) => {
  try {
    const data = req.body;

    data.userId = req.userId;

    const todo = await Todo.create({
      ...data,
    });

    if (!todo) {
      return res.json({
        success: false,
        message: 'Todo item could not be added!',
      });
    }

    res.json({
      success: true,
      message: 'Todo item added!',
      todo,
    });
  } catch (error) {
    console.log(error);

    res.json({ success: false, message: 'Todo item could not be added!' });
  }
};

exports.getTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id).populate('userId');
    console.log(todo, 'todo');
    if (!todo) {
      return res.json({
        success: false,
        message: 'Todo item could not be found!',
      });
    }

    res.json({
      success: true,
      todo,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: 'Todo item could not be found!',
    });
  }
};

exports.updateTodo = async (req, res, next) => {
  const { id } = req.params,
    updTodo = req.body;

  try {
    const todo = await Todo.findByIdAndUpdate(id, updTodo, {
      new: true,
      useFindAndModify: false,
    }).populate('userId');

    if (!todo) {
      return res.json({
        success: false,
        message: 'Todo item could not be updated!',
      });
    }

    res.json({ success: true, message: 'Todo item Updated!', todo });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: 'Todo item could not be updated!',
    });
  }
};

exports.deleteTodo = async (req, res, next) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.json({
        success: false,
        message: 'Todo item could not be deleted!',
      });
    }

    res.json({ success: true, message: 'Todo item deleted!', todo });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: 'Todo item could not be deleted',
    });
  }
};
