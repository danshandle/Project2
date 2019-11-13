const express = require("express"),
  baseball = require("../models/app");

const router = express.Router();

router.route("/").get(function(req, res) {
  baseball.allTeams(function(data) {
    let teamsObj = {
      teams: data
    };
    console.log(teamsObj);
    res.render("index", teamsObj);
  });
});

router.route("/api/home/team/:id").get(function(req, res) {
  let team_id = req.params.id;
  baseball.allplayers(team_id, function(data) {
    let playersObj = {
      homePlayers: data
    };
    console.log(playersObj.homePlayers);
   
    res.send(playersObj);
  });
});

router.route("/api/away/team/:id").get(function(req, res) {
  let team_id = req.params.id;
  baseball.allplayers(team_id, function(data) {
    let playersObj = {
      awayPlayers: data
    };

    res.render("index", playersObj);
  });
});

module.exports = router;
