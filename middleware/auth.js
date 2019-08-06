// Middleware is a function that has access to request and response object
// Every time I hit an end point, I can fire off this middleware
// Any time I need to protect the route (@access - private) I need to bring in our middleware (as 2nd parameter)

// Use to check there is a TOKEN in the header and then validate it

const jwt = require('jsonwebtoken');
const config = require('config');

// Export middleware function. At the end call function 'next' - go to next middleware
module.exports = function(req, res, next) {
  // Get token from header (x-auth-token is the key to token)
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // If there is token
  try {
    // Verify the token and put object/payload/(user.id) in the variable 'decoded'
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // Assign user from payload(decoded.user.id) to request object. So I have access to user(id) inside route (api/auth)
    req.user = decoded.user;

    // Go to next middleware
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
