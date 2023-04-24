const express = require('express');
const mysql = require('mysql');

const app = express();

// middleware to parse JSON request bodies
app.use(express.json());

// create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'your_database'
});

// GET request to retrieve user data
app.get('/users', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection', err);
      res.status(500).send('Error getting MySQL connection');
      return;
    }

    connection.query('SELECT * FROM users', (err, results) => {
      connection.release();

      if (err) {
        console.error('Error querying MySQL database', err);
        res.status(500).send('Error querying MySQL database');
        return;
      }

      res.json(results);
    });
  });
});

// start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});