const jwt = require('jsonwebtoken');
const createError = require('../utils/create-error');
const { User } = require('../models');

// This is a middleware function in an Express.js application. It is used to handle authorization in the API requests by checking if the request includes a valid JSON Web Token (JWT) in the "authorization" header.

// The function first checks if the "authorization" header exists and starts with "Bearer ". If not, it returns a 401 error with the message "you are unauthorized".

// Then, it extracts the token from the header and verifies it using the jwt.verify method and the secret key defined in the environment variables.

// It queries the database for a user with the id equal to the payload.id included in the token. If no user is found, it returns a 401 error with the message "you are unauthorized".

// If everything checks out, the user is attached to the request object and the next middleware is called. In case of an error, it calls the next middleware with the error object.
module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      createError('you are unauthorized', 401);
    }

    const token = authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({
      where: { id: payload.id },
      attributes: {
        exclude: ['password']
      }
    });
    if (!user) {
      createError('you are unauthorized', 401);
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
