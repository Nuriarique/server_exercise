"use stric";

const database = require("../infrastructure/database");

async function getUserByEmail(email) {
  const pool = await database.getPool();
  const queryEmail = "select * from users where email = ?";
  const [users] = await pool.query(queryEmail, email);
  return users[0];
}

async function createUSer(nombre, email, password) {
  const pool = await database.getPool();
  const query = "insert into users(name, email, password) values (?,?,?)";
  const [create] = await pool.query(query, [nombre, email, password]);

  return create.insertId;
}

module.exports = { getUserByEmail, createUSer };
