require('dotenv').config()
module.exports = {
    secret: process.env.DB_SECRET,
    user: process.env.DB_USER,
    host:process.env.DB_HOST,
    database:process.env.DATABASE
}