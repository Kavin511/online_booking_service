const mysql = require('mysql')
const dbConfig = require('./dbconfig');

const mysqlConnection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.secret,
    multipleStatements: true
});
mysqlConnection.connect((err) => {
    if (err) {
        console.log("Connection failed" + JSON.stringify(err))
    } else {
        console.log("Connected successfully!")
    }
})
mysqlConnection.query("use mysql")
module.exports = mysqlConnection