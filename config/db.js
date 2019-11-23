const mysql = require('mysql');
const dotenv = require('dotenv').config();
 
if (dotenv.error) {
    throw dotenv.error
}

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
})

module.exports = () => new Promise((resolve, reject) => {
    pool.getConnection((err, connection)=>{
        if(err) reject(err);
        else resolve(connection);
    });
});