"use strict";
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { SERVER_PORT } = process.env;
const { userControllers } = require("./controllers");
const middleware = require("./middleware");

//declaraciones
const app = express();

//middleware
app.use(bodyParser.json());

//Rutas
app.get("/user", middleware.validateAuth, userControllers.getData);
app.post("/login", userControllers.login);
app.post("/register", userControllers.register);

//middle página no encontrada
app.use(middleware.notFound);

//listener
app.listen(SERVER_PORT, () => {
  console.log(`Escuchando el servidor ${SERVER_PORT}`);
});
