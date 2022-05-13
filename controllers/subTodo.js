const SubTodo = require('../models/SubTodo');

exports.addSubTodo = async (req, res, next) => {
  try {
    const data = req.body;
    const subTodo = await SubTodo.create({
      ...data,
    });

    if (!subTodo) {
      return res.json({
        success: false,
        message: 'SubTodo item could not be added!',
      });
    }

    res.json({
      success: true,
      message: 'SubTodo item added!',
      subTodo,
    });
  } catch (error) {
    console.log(error);

    res.json({ success: false, message: 'SubTodo item could not be added!' });
  }
};

exports.updateSubTodo = async (req, res, next) => {
  try {
    const { id } = req.params,
      updSubTodo = req.body,
      subTodo = await SubTodo.findByIdAndUpdate(id, updSubTodo, {
        new: true,
        useFindAndModify: false,
      }).populate('todoId');

    if (!subTodo) {
      return res.json({
        success: false,
        message: 'SubTodo item could not be updated!',
      });
    }

    res.json({ success: true, message: 'SubTodo item Updated!', subTodo });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: 'SubTodo item could not be updated!',
    });
  }
};

exports.deleteSubTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const subTodo = await SubTodo.findByIdAndDelete(id);

    if (!subTodo) {
      return res.json({
        success: false,
        message: 'SubTodo item could not be deleted!',
      });
    }

    res.json({ success: true, message: 'SubTodo item deleted!', subTodo });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: 'SubTodo item could not be deleted',
    });
  }
};
