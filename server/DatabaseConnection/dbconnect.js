const mysql = require("mysql");
const { databaseOptions } = require("../Config/config");
const connection = mysql.createConnection(databaseOptions);
connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MYSQL connected");
});
module.exports = connection;
