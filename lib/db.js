// lib/db.js
const mysql = require('mysql2/promise');

// Update these connection settings as needed
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'stern',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;