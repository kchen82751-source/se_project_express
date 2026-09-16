const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../utils/config");

const UnauthorizedError = require("../errors/UnauthorizedError");

const handleAuthError = (res, next) =>
  next(new UnauthorizedError("Unauthorized Access"));

const extractBearerToken = (header) => header.replace("Bearer ", "");

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload; // adding the payload to the Request object

  return next(); // passing the request further along
};
