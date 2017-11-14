const mysql = require('mysql')
const pool = mysql.createPool(config.mysql)


const query = (sql) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, (error, results) => {
      if(error) reject(error);
      resolve(results);
    })
  })
}

module.exports = query