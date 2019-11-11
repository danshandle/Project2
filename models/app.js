// Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm.js");

const baseball = {
  allTeams: function(cb) {
    orm.selectAll("teams", function(res) {
      cb(res);
    });
  },
  allplayers: function(cb) {
    orm.selectAll("players", function(res) {
      cb(res);
    });
  }
};

module.exports = baseball;
