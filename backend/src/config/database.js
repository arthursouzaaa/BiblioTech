const { Pool } = require('pg');
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DBPASSWORD,
  database: process.env.DB_NAME,
});

module.exports = { pool };
