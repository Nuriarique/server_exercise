"use strict";
const { JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");

function validateAuth(req, res, next) {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, JWT_SECRET);

    const { id, name, role } = decodedToken;
    req.auth = { id, name, role };
    next();
  } catch (error) {
    res.status(401);
    res.send("tienes que estar logeado");
  }
}

module.exports = validateAuth;
