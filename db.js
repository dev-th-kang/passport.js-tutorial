const db = require('mysql');
const createDB = db.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"passport_test"
})

module.exports = createDB;