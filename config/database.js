const mysql = require("mysql");
const util = require("util");
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    //port: 3305,
    user: 'root',
    password: '',
    database: 'proyecto_final_tallernode'
});
pool.query= util.promisify(pool.query);
module.exports = pool;
