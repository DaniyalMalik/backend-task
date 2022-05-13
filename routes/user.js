const express = require('express'),
  router = express.Router(),
  {
    register,
    login,
    getMe,
    changePassword,
    updateUser,
  } = require('../controllers/user'),
  protect = require('../middlewares/protect');

router.post('/register', register);
router.post('/login', login);
router.put('/changepassword', protect, changePassword);
router.put('/updateuser', protect, updateUser);
router.get('/me', protect, getMe);

module.exports = router;
