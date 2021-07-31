require('dotenv').config();
const bodyParser = require('body-parser')
const mysql = require('mysql');
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const password = process.env.PW;
const saltRounds = 10;
const port = process.env.PORT || 3001;


app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(cors());
app.use(express.json());

// -------------------routes --------------------------

app.post('/signup', function(req, res) {
    let username = req.body.username;
    let password = generatePasswordHash(req.body.password);

    // check if username already exists
    connection.query('SELECT * FROM users WHERE username = ?', [username], function(err, result) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else if (result.length > 0) {
            res.status(400).send('Username already exists');
        } else {
            connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], function(err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                } else {
                    res.status(200).send('User created');
                }
            });
        }
    });
});

app.get('/signin', function(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    // get hash from database
    let select_query = 'SELECT password FROM users WHERE username = "' + username + '"';
    connection.query(select_query, function(err, result) {
        if (err) {
            console.error('Error selecting from table', err);
            return;
        }
        if (result.length === 0) {
            res.send('Username not found');
        } else {
            let hash = result[0].password;
            if (checkPassword(password, hash)) {
                res.send('Success');
            } else {
                res.send('Incorrect password');
            }
        }
    });
});


// -------------------helper functions --------------------

function generatePasswordHash(password) {
    return bcrypt.hashSync(password, saltRounds);
}

function checkPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
}

// -------------------database connection--------------------------

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

app.listen(port, () => console.log(`Server running on http://localhost:${port}`))