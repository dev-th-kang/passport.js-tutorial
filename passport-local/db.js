const db = require('mysql');
require('dotenv').config()
const createDB = db.createConnection({
    host:process.env.db_host,
    user:process.env.db_user,
    password:process.env.db_password,
    database:process.env.db_database
})

module.exports = createDB;