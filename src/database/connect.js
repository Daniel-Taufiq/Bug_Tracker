require('dotenv').config();
const bodyParser = require('body-parser')
const mysql = require('mysql');
const sql = require('mssql');
const express = require('express');
const bcrypt = require('bcrypt');
const buffer = require('buffer');
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
    console.log(password);

    // check if username already exists in mssql
    let query = "SELECT * FROM Users WHERE username = '" + username + "'";
    request.query(query, function(err, result) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            if (result.length > 0) {
                res.status(400).send('Username already exists');
            } else {
                // create a new user in mssql
                let query = "INSERT INTO Users (username, password) VALUES ('" + username + "', " + "CONVERT(varbinary,'"+ password + "'))";
                console.log(query);
                request.query(query, function(err, result) {
                    if (err) {
                        console.log(err);
                        res.status(500).send(err);
                    } else {
                        res.status(200).send('User created');
                    }
                });
            }
        }
    });
});

app.post('/login', function(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    console.log(username, password);

    // get hash from mssql
    let query = "SELECT * FROM Users WHERE username = '" + username + "'";
    request.query(query, function(err, result) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(result.recordset[0]);
            if (result.recordset.length > 0) {
                let hash = result.recordset[0].password;
                console.log(hash);
                // check if password matches hash
                if (checkPassword(password, hash)) {
                    res.status(200).send('Login successful');
                } else {
                    res.status(400).send('Incorrect password');
                }
            } else {
                res.status(400).send('Username does not exist');
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

var config = {  
    server: 'localhost\\MSSQLSERVER',
    port: 1433,
    user: 'user',
    password: 'user',
    database: 'Bug_Tracker',
    options: {
        trustedConnection: true,
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true,
    
      },
};

let connection = new sql.ConnectionPool(config);
let request = new sql.Request(connection);

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting to database', err);
        return;
    }
    console.log('Connection established');
    create_table();
});


function create_table() {
    // create a table if it doesn't exist
    let query = "IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Users]') AND type in (N'U')) BEGIN CREATE TABLE [dbo].Users(id INT IDENTITY(1,1), [username] [varchar](50) NOT NULL,[password] [char](64) NOT NULL) END"

    request.query(query, function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
    });
}

app.listen(port, () => console.log(`Server running on http://localhost:${port}`))