const mysql = require("mysql");
require('dotenv').config();

if(process.env.JAWSDB_URL) {
  const connection =mysql.createConnection(process.env.JAWSDB_URL):
} else {
  const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "baseballdb"
})

}

;

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;
