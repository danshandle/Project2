// Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm.js");

const baseball = {
  allTeams: cb => {
    orm.selectAll("teams", function(res) {
      cb(res);
    });
  },
  allplayers: cb => {
    orm.selectAll("players", function(res) {
      console.log(res)
      cb(res);
    });
  }
};

module.exports = baseball;



