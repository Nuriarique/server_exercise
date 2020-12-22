"use strict";
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepository = require("../../repositories/users-repositoy");

async function login(req, res) {
  try {
    const registerSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(4).max(20).required(),
    });

    await registerSchema.validateAsync(req.body);
    const { email, password } = req.body;

    //buscar si existe usuario
    const user = await userRepository.getUserByEmail(email);

    if (!user) {
      const err = new Error("El usuario no existe");
      err.code = 400;
      throw err;
    }

    //comprobar que la contraseña coincide
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      const err = new Error("contraseña no coincide");
      err.code = 409;
      throw err;
    }

    const tokenPayload = { id: user.id, name: user.name, role: user.role };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.send(token);
  } catch (error) {
    if (error.name === "ValidationError") {
      error.status = 400;
    }
    console.log(error);
    res.status(error.status || 500);
    res.send({ error: error.message });
  }
}

module.exports = login;
