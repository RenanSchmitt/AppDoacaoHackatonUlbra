const mysql = require("mysql");

var pool = mysql.createPool({
    host: "mysql669.umbler.com",
    port: 41890,
    user: "hackathon",
    password: "G(yU77cZgP2)",
    database: "ajudaae"
});

function getConnection() {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) reject(err);
            else resolve(connection);
        });
    });
}


module.exports = {
    get connection() {
        return getConnection();
    },
    mysql: mysql
}