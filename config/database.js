const mysql = require("mysql");

require("dotenv").config();

// Create a MySQL connection

const connection = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

console.log(process.env.password);

module.exports = { connection };
