var mysql = require('mysql');
var dbConfig = {
    host : 'localhost',
    user : 'root',
    password : '1234',
    port : 3306,
    multipleStatements : true,
    database : 'instagram_clone',
    dateStrings:'date'
};

var pool = mysql.createPool(dbConfig);
module.exports = pool;
