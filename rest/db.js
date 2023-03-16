const mysql = require("mysql");
const config = require("./config");

const pool = mysql.createPool(config.db);

module.exports = {
    getConnection: (callback) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                return callback(err);
            }
            callback(null, connection);
        });
    }
};

