const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');


const app = express();
const cors = require("cors");
const { useState } = require('react');

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "Abhishek",
    database: "user_account",
});
db.connect((err) => {
    if (!err) {
        console.log('Database is connected');
    } else {
        console.log("Database is not connected");
        throw err;
    }
});

app.get('/', (req, res) => {
    res.send("Welcome!")
});

app.post('/validity', async (request, response) => {

    const email = request.body.email;
    const password = request.body.password;

    // console.log(email);
    // console.log(password);

     db.query('SELECT * FROM users WHERE email = ? and password = ?;', [email,password], (err, results, fields) => {
        if (results.length) {
            response.status(200).json({ response: true });

          
        } else {
            response.status(400).json({ response: false });
        }

    });
});

app.post('/register_check', async (request, response) => {

    const email = request.body.email;

    // console.log(email);

     db.query('SELECT * FROM users WHERE email = ?;', [email], (err, results, fields) => {
        if (results.length) {
            response.status(200).json({ response: true });

          
        } else {
            response.status(400).json({ response: false });
        }

    });
});



app.post('/register', (req, res) => {
    // console.log(req.body)
    const email = req.body.email;
    const password = req.body.password;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;

    // const exist_check = "SELECT * FROM users WHERE email =(?);";

    // db.query(exist_check,[email],(err,result) => {
    //     if(!err){}
    // });

    db.query("INSERT INTO users(email,password,first_name,last_name) VALUES (?,?,?,?);",
        [email, password, first_name, last_name],
        (err, result) => {
            // console.log(err);
            console.log('result', result)
        });

    // res.send("Im registering");
});

app.listen(3008, () => {
    console.log("running server");
});
// the upper one is also a same thing.
// mysql.connect(function(err) {
//     if(err)
//       throw err;
//     console.log("Connection successful...")
//   });
