const express = require('express'),
  router = express.Router(),
  {
    addSubTodo,
    deleteSubTodo,
    updateSubTodo,
  } = require('../controllers/subTodo'),
  protect = require('../middlewares/protect');

router.post('/', protect, addSubTodo);
router.delete('/:id', protect, deleteSubTodo);
router.put('/:id', protect, updateSubTodo);

module.exports = router;
