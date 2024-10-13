const jwt = require('jsonwebtoken');
const User = require('../model/userShema');

exports.auth = async (req, res, next) => {
  let token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }
  token = token.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_USER);
    const user = await User.findOne({ where: { id: decoded.id } });

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Failed to authenticate token' });
  }
};
