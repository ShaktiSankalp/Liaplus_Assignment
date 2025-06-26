const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).send({ message: 'Authentication required.  Login with Valid credentials First' });
  }

  try {
    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).send({ message: 'Invalid token' });
  }
};

module.exports = requireAuth;
