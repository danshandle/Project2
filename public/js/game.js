$(document).ready(() => {
function newInning(inning) {
  visScoreInning = 0;
  homeScoreInning = 0;
  homeTotalSum = 0;
  visTotalSum = 0;


  let top = new Promise((res, rej) => {
    res(atBatsTop());
  });
  top.then(atBatsBottom());

  console.log(visScoreInning);
  console.log(homeScoreInning);
}
function atBatsTop() {
    console.log("top");
    current = 0;
    let outs = 0,
      hits = 0;

    $(".out-btn").on("click", function() {
      outs++;
      console.log(outs);

      if (outs < 3) {
        if (hits >= 4) {
          visScoreInning++;
          $(`#visScore${inning}`).text(visScoreInning);
          //gif
        }
      } else {
        return;
      }
    });

    $(".hit-btn").on("click", function() {
      hits++;
      console.log(hits);
    });
}

function atBatsBottom() {
    console.log("bottom");
    current = 0;

    let outs = 0,
      hits = 0;

    $(".hit-btn").on("click", function() {
      hits++;
      console.log(hits);
    });

    $(".out-btn").on("click", function() {
      outs++;
      console.log(outs);

      if (outs < 3) {
        if (hits >= 4) {
          homeScoreInning++;
          $(`#visScore${inning}`).text(homeScoreInning);

          //gif
        }
      } else {
        console.log(inning);
        inning++;
        return;
      }
    });
}

  let home_team_id,
    away_team_id,
    inning = 1,
    visScoreInning = 0,
    homeScoreInning = 0,
    current, //resets base indicator to empty at start of inning;
    mainPage = $("body");
    //mainPage.css("background-image", backgrounds[0] + "top center no-repeat");
    
const backgrounds = new Array( //array of background images
    "url(../images/diamondEmpty.jpg)",
    "url(../images/diamond1stBase.jpg)",
    "url(../images/diamond2ndBase.jpg)",
    "url(../images/diamond3rdBase.jpg)"
  );
  

  $("#batter-card").hide();

  $(".home-team-btn").on("click", function() {
    $("#home-roster").empty();

    let id = $(this).data("home-id");
    home_team_id = id;
    $(`.${id}`).hide();
    $("#home-team-drop").hide();

    $.ajax(`/api/home/team/${id}`, {
      type: "GET"
    }).then(function(data) {
      data
        .reduce(
          function(table, row) {
            $(`<tr>
            <th scope="row" class="player" id="${row.player_id}">${
              row.jersey_number
            }</th>
            <td>${row.player_name}</td>
            <td>${row.position}</td>
            <td>${row.handness}</td>
            <td>${row.bat_avg}</td>

            <td><button class="player-at-bat-btn" id="ht-player-${
              row.player_id
            }" disable="false"
                data-name="${row.player_name}"
                data-pos="${row.position}"
                data-ros="${row.jersey_number}"
                data-hand="${row.handness}"
                data-bat_avg="${row.bat_avg}"
                data-player_id="${row.player_id}">Bat</button></td>
            </tr>`).appendTo(table);

            return table;
          },
          $(`<table class="table table-bordered table-striped mb-0">
                <thead>
                <tr>
                    <th scope="col">Roster</th>
                    <th scope="col">Name</th>
                    <th scope="col">Position</th>
                    <th scope="col">Hand</th>
                    <th scope="col">Avg</th>
                    <th scope="col">At Bat</th>
                </tr>
                </thead>
                <tbody id="home-roster"></tbody>
            </table>`)
        )
        .appendTo($("#home-roster"));
    });
  });

  $(".away-team-btn").on("click", function() {
    $("#away-roster").empty();
    let id = $(this).data("away-id");
    away_team_id = id;

    $(`.${id}`).hide();
    $("#away-team-drop").hide();

    $.ajax(`/api/away/team/${id}`, {
      type: "GET"
    }).then(function(data) {
      data
        .reduce(
          function(table, row) {
            $(`<tr>
                <td><button class="player-at-bat-btn" id="at-player-${
                  row.player_id
                }" disable="false"
                  data-name="${row.player_name}"
                  data-pos="${row.position}"
                  data-ros="${row.jersey_number}"
                  data-hand="${row.handness}"
                  data-bat_avg="${row.bat_avg}"
                  data-player_id="${row.player_id}">Bat</button></td>
                </td>
                <th scope="row">${row.jersey_number}</th>
                <td>${row.player_name}</td>
                <td>${row.position}</td>
                <td>${row.handness}</td>
                <td>${row.bat_avg}</td>
                
              </tr>`).appendTo(table);

            return table;
          },
          $(`<table class="table table-bordered table-striped mb-0">
                  <thead>
                    <tr>
                      <th scope="col">At Bat</th>
                      <th scope="col">Roster</th>
                      <th scope="col">Name</th>
                      <th scope="col">Position</th>
                      <th scope="col">Hand</th>
                      <th scope="col">Avg</th>
                      
                    </tr>
                  </thead>
                  <tbody id="home-roster"></tbody>
                </table>`)
        )
        .appendTo($("#away-roster"));
    });
  });

  $(document).on("click", ".player-at-bat-btn", function(e) {
    let isAtBat = e.target.getAttribute("disable");
    console.log(isAtBat);
    if (isAtBat === "false") {
      let dataSet = $(this)[0].dataset;
      $("#batter-card").show();
      $("#batter-card-name").text(dataSet["name"]);
      $("#batter-card-bat_avg").text(dataSet["bat_avg"]);
      $("#batter-card-roster").text(dataSet["ros"]);
      $("#batter-card-pos").text(`Position: ${dataSet["pos"]}`);
      $("#batter-card-hand").text(`Bats: ${dataSet["hand"]}`);
      $("#batter-card").attr("data-player_id", `${dataSet["player_id"]}`);
    }
    //e.currentTarget.attributes['disable'] = true;
  });

  $(".hit-btn").on("click", function() {
    current++;
    mainPage.css("background-image", backgrounds[current]);
    let player_id = $(this).parent()[0].dataset["player_id"];
    $("#batter-card").hide();
    console.log("hit");
    console.log(player_id);

    $.ajax({
      url: "batter/hits/" + player_id,
      type: "post"
    }).then(function(data) {
      console.log(data);
    });
  });

  $(".out-btn").on("click", function() {
    let player_id = $(this).parent()[0].dataset["player_id"];
    $("#batter-card").hide();
    console.log("out");
    console.log(player_id);

    $.ajax({
      url: "batter/outs/" + player_id,
      type: "post"
    }).then(function(data) {
      console.log(data);
    });
  });


  $("#start-match").on("click", function() {
    console.log("game started");

    let match = new Promise((res, rej) => {
      newInning(inning);
      res();
    });

    match;
    // .then(newInning(inning))
    // .then(newInning(inning))
    // .then(newInning(inning))
    // .then(newInning(inning))
    // .then(newInning(inning))
    // .then(newInning(inning))
    // .then(newInning(inning))
    // .then(newInning(inning))

    if ($(this).text() === "Start Match") {
      $(this)
        .attr("disable", true)
        .text("End Game");
    } else {
      console.log("game ended");

      var newMatch = {
        home: home_team_id,
        away: away_team_id,
        homeScore: Number.parseInt($("#resultHome").text()),
        awayScore: Number.parseInt($("#resultVis").text())
      };

      /*Post Match*/
      $.ajax("/api/match", {
        type: "POST",
        data: newMatch
      }).then(function() {
        console.log("new match");
      });

      $(this)
        .attr("disable", true)
        .text("Start Game");
    }
  });

  //Sum up the scores on the scoreboard
  $(".visScore").on("change", function() {
    var currentValue = parseInt($(this).val());
    visTotalSum += currentValue;
    $("#resultVis").text(visTotalSum);
  });

  
  $(".homeScore").on("change", function() {
    var currentValue = parseInt($(this).val());
    homeTotalSum += currentValue;
    $("#resultHome").text(homeTotalSum);
  });

});
