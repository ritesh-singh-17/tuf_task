const mysql = require('mysql');
require("dotenv").config();


var db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
      console.log("Error in connecting to database");
      throw err;
  }
  console.log("Connected to database")
})

module.exports = db;
