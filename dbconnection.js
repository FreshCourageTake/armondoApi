const mysql = require('mysql'),
    connection = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'armondo'
    });

module.exports = connection;