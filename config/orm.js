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
  },

  selectOne: (table, team_id, cb) => {
    let query = `SELECT * From ${table} WHERE team_id = '${team_id}'`;

    connection.query(query, function(err, res) {
      if (err) {
        throw err;
      }

      cb(res);
    });
  },
  selectWhere: (table, condition, cb) => {
    let query = `SELECT * FROM ${table} Where player_id = ${condition};`;
    connection.query(query, function(err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    })
  }
  
};

module.exports = orm;
