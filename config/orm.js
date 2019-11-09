const connection = require("connection");

const orm = {
  selectAll: (table, cb) => {
    let query = `SELECT * FROM ${table};`;

    if (err) {
      throw err;
    }
    connection.query(query, function(err, res) {
      cb(res);
      console.log(res);
    });
  }
};

module.exports = orm;
