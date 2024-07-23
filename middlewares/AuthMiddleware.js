const jwt = require('jsonwebtoken');

/*
const authMiddleware = (req, res, next) => {
  const auth = req.header('Authorization')
  if (!auth) return res.status(401).send('Access denied. No token provided.');

  token = auth.replace('Bearer ', '');
  if (!token) return res.status(401).send('Access denied. No token provided.');


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    req.verified = token;
    next();
  } catch (error) {
    res.status(400).send('Invalid token');
  }
};
*/



const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user; 
    next();
  });
  
};

module.exports = {authMiddleware}