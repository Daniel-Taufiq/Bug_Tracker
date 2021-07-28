require('dotenv').config();
const bodyParser = require('body-parser')
const mysql = require('mysql');
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const password = process.env.PW;
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(express.json());

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: password,
    database: 'bug_tracker'
});

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting to MySQL', err);
        return;
    }

    create_table();

    console.log('Connection established');
});

function create_table() {
    let create_table_query = 'CREATE TABLE IF NOT EXISTS users (id INT(11) NOT NULL AUTO_INCREMENT, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY (id))';

    connection.query(create_table_query, function(err, result) {
        if (err) {
            console.error('Error creating table', err);
            return;
        }

        console.log('Table created');
    });
}

app.post('/signup', function(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    let insert_query = 'INSERT INTO users (username, password) VALUES ("' + username + '", "' + password + '")';

    connection.query(insert_query, function(err, result) {
        if (err) {
            console.error('Error inserting into table', err);
            return;
    }
    res.send('Success');
    });
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`))