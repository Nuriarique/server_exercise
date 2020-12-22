"use strict";

const Joi = require("joi");
const bcrypt = require("bcryptjs");
const userRepository = require("../../repositories/users-repositoy");

async function register(req, res) {
  try {
    const schema = Joi.object({
      nombre: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(4).max(16),
      repeatPassword: Joi.ref("password"),
    });
    await schema.validateAsync(req.body);

    const { nombre, email, password } = req.body;
    console.log(email);

    //comprobar que no hay un usuario ya registrado con ese emaiil
    const user = await userRepository.getUserByEmail(email);

    if (user) {
      const error = new Error("usuario ya existe");
      error.code = 409;
      throw error;
    }
    //encriptar contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    //crear usuario
    const id = await userRepository.createUSer(nombre, email, passwordHash);

    res.send({ userId: id });
  } catch (error) {
    if (error.name === "ValidationError") {
      error.status = 400;
    }
    console.log(error);
    res.status(error.status || 500);
    res.send({ error: error.message });
  }
}

module.exports = register;
