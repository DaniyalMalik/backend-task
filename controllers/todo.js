const Todo = require('../models/Todo');
const SubTodo = require('../models/SubTodo');

exports.getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find()
      .lean()
      .sort('-createdAt')
      .populate('userId');

    for (let todo of todos) {
      let result = await SubTodo.find({ todoId: todo._id });

      todo.subTodos = result;
    }

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
      .lean()
      .sort('-createdAt')
      .populate('userId');

    for (let todo of todos) {
      let result = await SubTodo.find({ todoId: todo._id });

      todo.subTodos = result;
    }

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
    const subTodos = await SubTodo.find({ todoId: id })
      .sort('-createdAt')
      .populate('todoId');

    if (!todo) {
      return res.json({
        success: false,
        message: 'Todo item could not be found!',
      });
    }

    res.json({
      success: true,
      todo,
      subTodos,
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
  try {
    const { id } = req.params,
      updTodo = req.body;
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
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    const subTodos = await SubTodo.find({ todoId: id });

    subTodos.forEach(async (subTodo) => {
      await SubTodo.findByIdAndDelete(subTodo._id);
    });

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
