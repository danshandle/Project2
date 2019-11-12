const connection = require("./connection");

const orm = {
  selectAll: (table, cb) => {
    let query = `SELECT * FROM ${table};`;

    connection.query(query, function(err, res) {
      if (err) {
        throw err;
      }

      cb(res);
      
    });
  }
};

module.exports = orm;
