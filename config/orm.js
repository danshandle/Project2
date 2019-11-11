const connection = require('./connection.js');

const orm = {
  selectAll: (table, cb) => {
    let query = `SELECT * FROM ${table};`;
    connection.query(query, function(err, res) {
      if (err) {
        throw err;
      }

      cb(res);
      console.log(res);
    });
  }
};

module.exports = orm;
