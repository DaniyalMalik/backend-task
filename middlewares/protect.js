const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const token = req.header('x-auth-token');

  try {
    if (!token)
      return res
        .status(401)
        .json({ message: 'No authentication token, access denied.' });

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified)
      return res
        .status(401)
        .json({ message: 'Token verification failed, access denied.' });

    req.userId = verified.id;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = protect;
