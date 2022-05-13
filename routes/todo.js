const express = require('express'),
  router = express.Router(),
  {
    addTodo,
    deleteTodo,
    updateTodo,
    getTodo,
    getTodos,
    getTodosByUserId,
  } = require('../controllers/todo'),
  protect = require('../middlewares/protect');

router.post('/', protect, addTodo);
router.delete('/:id', protect, deleteTodo);
router.put('/:id', protect, updateTodo);
router.get('/', protect, getTodos);
router.get('/byuserid', protect, getTodosByUserId);
router.get('/:id', protect, getTodo);

module.exports = router;
