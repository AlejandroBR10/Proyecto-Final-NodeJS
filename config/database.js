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
<<<<<<< HEAD
pool.query= util.promisify(pool.query);
module.exports = pool;
=======
pool.query = util.promisify(pool.query);
module.exports = pool;  
>>>>>>> d15b37ac8dd71fadb400200615bfca39f2348d9a
