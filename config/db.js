const mysql = require('mysql')
// const dbConfig = require('./dbconfig');
require('dotenv').config()
// module.exports = {
//     secret: process.env.DB_SECRET,
//     user: process.env.DB_USER,
//     host:process.env.DB_HOST,
//     database:process.env.DATABASE
// }
const mysqlConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_SECRET,
    multipleStatements: true
});
mysqlConnection.connect((err) => {
    if (err) {
        console.log("Connection failed" + JSON.stringify(err))
    } else {
        console.log("Connected successfully!")
    }
})
mysqlConnection.query("use " + process.env.DATABASE)
module.exports = mysqlConnection