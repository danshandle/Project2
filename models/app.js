// Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm.js");


const baseball = {
  allTeams: cb => {
    orm.selectAll("teams", function(res) {
      cb(res);
    });
  },
  allplayers: (team_id, cb) => {
    orm.selectOne("players", team_id, function(res) {
      // console.log(res);
      cb(res);
    });
  },
  selectBatter: function(batterid, cb) {
    orm.selectWhere("players", batterid, function(res) {
      cb(res);
    })
  }
};

module.exports = baseball;
