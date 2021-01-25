var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'nodejs',
    password: '111111',
    database: 'opentutorials'
});

connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function(error, results, fields){
connection.query('SELECT * FROM topic', function(error, results, fields){
    if(error)
    {
        console.log(error);
    }
    // console.log('The solution is: ', results[0].solution);
    console.log(results);
});

connection.end();