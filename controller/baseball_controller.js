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


    res.json(playersObj.homePlayers);

  });
});

router.route("/api/away/team/:id").get(function(req, res) {
  let team_id = req.params.id;
  baseball.allplayers(team_id, function(data) {
    let playersObj = {
      awayPlayers: data
    };

    res.json(playersObj.awayPlayers);

  });
});

router.route("/api/matches").post(function(req, res) {
  baseball.createMatch(home, away, loc, function(result) {
    
    res.json({ id: result.insertId });
  });
});

router.route("/batter/:id").get(function(req, res) {
  baseball.selectBatter(req.params.id, function(data) {
    let playersObj = {
      players: data
    };
    console.log(playersObj);
    res.render("./partials/batter/batter", playersObj);

  });
});

router.route("/batter/hits/:id").get(function(req, res) {
  baseball.selectHits(req.params.id, function(data) {
    console.log(data)
  })
})

router.route("/batter/outs/:id").get(function(req, res) {
  baseball.selectOuts(req.params.id, function(data) {
    console.log(data)
  })
})
module.exports = router;
