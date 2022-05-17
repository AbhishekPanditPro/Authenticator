var mysql = require('mysql');
var conn = mysql.createConnection({
  host:"localhost",
  user:"root",
  password: "Abhishek",
  database:"logged_user"
});

conn.connect(function(err) {
  if(err)
    throw err;
  console.log("Connection successful...")
});

