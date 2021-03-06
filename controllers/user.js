const User = require('../models/User'),
  bcrypt = require('bcryptjs');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password,
    });

    if (!user) {
      res.json({
        success: false,
        message: `User could not be registered!`,
      });
      s;
    }

    res.json({
      success: true,
      message: 'User registered!',
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: `User could not be registered!`,
    });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.json({ success: false, message: 'Invalid Credentials!' });
  }

  const isSame = await user.matchPassword(password);

  if (!isSame) {
    return res.json({ success: false, message: 'Invalid Credentials!' });
  }

  user = await User.findOne({ email });

  sendTokenResponse(user, res, 'User Logged In!');
};

exports.getMe = async (req, res, next) => {
  const user = await User.findById(req.userId);

  res.json({
    success: true,
    data: user,
  });
};

exports.changePassword = async (req, res, next) => {
  try {
    const id = req.userId,
      updUser = req.body;
    let user = await User.findById(id).select('password');
    const isSame = await user.matchPassword(updUser.oldPassword);

    if (!isSame)
      return res.json({
        success: false,
        message: 'Old password is incorrect!',
      });

    if (updUser.password !== updUser.passwordCheck)
      return res.json({ success: false, message: 'Passwords not matched!' });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(updUser.password, salt);

    user = await User.findByIdAndUpdate(
      id,
      { password: passwordHash },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      },
    );

    if (!user) {
      return res.json({
        success: false,
        message: 'Password could not be updated!',
      });
    }

    res.json({ success: true, message: 'Password Updated!', user });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: 'Password could not be updated!',
    });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const id = req.userId,
      updUser = req.body;

    delete updUser['password'];

    const user = await User.findByIdAndUpdate(id, updUser, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    if (!user) {
      return res.json({
        success: false,
        message: 'User not found!',
      });
    }

    res.json({ success: true, message: 'User Updated!', user });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: 'User not found!',
    });
  }
};

const sendTokenResponse = (user, res, message) => {
  const token = user.getSignedJwtToken();

  return res.json({ success: true, token, message, user });
};
