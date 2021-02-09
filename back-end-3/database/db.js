var mysql_async = require('mysql');
var db_async = mysql_async.createConnection({
  host: 'localhost',
  user: 'nodejs',
  password: '111111', database: 'opentutorials'
});

var mysql = require('sync-mysql');
var db = new mysql({
  host: 'localhost',
  user: 'nodejs',
  password: '111111',
  database: 'opentutorials'
});

class Database
{

}

module.exports = Database;