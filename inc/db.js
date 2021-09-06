const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'saboroso',
    password: '@Senha4787v',
    multipleStatements: true
  });

module.exports = connection;