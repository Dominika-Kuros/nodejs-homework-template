const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../models/user");

const HttpError = require("../helpers/HttpError");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const authHeader = req.headers;
  if (!authHeader) return HttpError(401, "Not authorized");
  console.log(authHeader);
  //   const token = authHeader.split(" ")[1];
  //   jwt.verify(token, SECRET_KEY, (err, decoded) => {
  //     if (err) return res.sendStatus(403);
  //     req.User = decoded.username;
  //     next();
  //   });
  // };

  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
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
