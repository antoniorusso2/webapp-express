const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'movies_db',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('connessione al database riuscita');
});

module.exports = connection;
