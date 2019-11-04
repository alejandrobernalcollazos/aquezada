var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});

// connection configurations
var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'attitudes',
    password: 'password',
    database: 'curriculum'
});

// connect to database
dbConn.connect(); 

// Retrieve all attitudes 
app.get('/attitudes', function (req, res) {
    dbConn.query('SELECT * FROM attitudes', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'attitudes list.' });
    });
});

// Retrieve attitude with id 
app.get('/attitude/:id', function (req, res) {
  
    let attitude_id = req.params.id;
  
    if (!attitude_id) {
        return res.status(400).send({ error: true, message: 'Please provide attitude_id' });
    }
  
    dbConn.query('SELECT * FROM attitudes where id=?', attitude_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'attitudes list.' });
    });
  
});

// set port
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});

module.exports = app;
