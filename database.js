const db = require("mysql")
const dbconfig = require("./config/mysql")

const connection = mysql.createConnection(dbconfig);




function getAllUser(callback) {
    connection.query(`SELECT * FROM USER`, (err, rows, fields) => {
        if (err) throw err;
        callback(rows);
    });
}

// function getAll


module.exports = { getAllMemos }




