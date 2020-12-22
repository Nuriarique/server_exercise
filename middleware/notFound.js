"use strict";

const { not } = require("joi");

function notFound(req, res) {
  res.status(400).send({ message: "not found" });
}

module.exports = notFound;
