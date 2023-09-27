const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const HttpError = require("../helpers/HttpError");

const secret = process.env.SECRET_KEY;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  console.log(authorization);
  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized"));
  }
  try {
    const { id } = jwt.verify(token, secret);
    const user = await User.findById(id);
    if (!user || user.token !== token || !user.token) {
      next(HttpError(401, "Not authorized"));
    }
    req.user = user;
    next();
  } catch {
    next(HttpError(401, "Not authorized"));
  }
};

module.exports = authenticate;
