const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {


  const auth = req.header('Authorization')
  if (!auth) return res.status(401).send('Access denied. No token provided.');

  token = auth.replace('Bearer ', '');
  if (!token) return res.status(401).send('Access denied. No token provided.');


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send('Invalid token');
  }
};

module.exports = {authMiddleware}