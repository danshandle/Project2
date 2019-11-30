$(document).ready(() => {
  let home_team_id,
    away_team_id,
    inning = 0,
    mainPage = $("body"),
    visTotalSum = 0,
    homeTotalSum = 0;
  

  async function startMatch() {
    await atBats(); //1st inning
    await atBats(); //2nd inning
    await atBats(); //3rd inning
    await atBats(); //4th inning
    await atBats(); //5th inning
    await atBats(); //6th inning
    await atBats(); //7th inning
    await atBats(); //8th inning
    await atBats(); //9th inning
    return;
  }

  function atBats() {
    inning += 1;
    mainPage.css("background-image", 'url(../images/diamondEmpty.jpg)');

    $(`#visScore${inning}`).attr({
      'class' : 'current-inning'
    })
    
    
    let visOuts = 0,
      visHits = 0,
      visScoreInning = 0,
      homeOuts = 0,
      homeHits = 0,
      homeScoreInning = 0,
      isTop = true;

      
      

    return new Promise((res, rej) => {
      
      // On-click Out
      $(".out-btn").on("click", function() {
        let player_id = $(this).parent()[0].dataset["player_id"];
        $("#batter-card").hide();
        // Post out to season_bats_stats
        $.ajax({
          url: `batter/outs/${player_id}`,
          type: "post"
        }).then(function(data) {
          console.log(`Player ID: ${player_id} updated`);
        });

        if (isTop) {
          visOuts++;
          $('#outs-indicator').text(visOuts.toString())

          if (visOuts >= 3) {
            $(`#visScore${inning}`).unbind();
            $('#outs-indicator').text(0);

            $(`#visScore${inning}`).removeClass('current-inning');
            $(`#homeScore${inning}`).attr({
              'class' : 'current-inning'
            })
           
            mainPage.css("background-image", 'url(../images/diamondEmpty.jpg)');
            isTop = false;

          }
        } else if (!isTop) {
          homeOuts++;
          $('#outs-indicator').text(homeOuts.toString())


          if (homeOuts >= 3) {
            $(`#homeScore${inning}`).unbind();
            $('#outs-indicator').text(0);

            $(`#homeScore${inning}`).removeClass('current-inning');
            
            mainPage.css("background-image", 'url(../images/diamondEmpty.jpg)');
            isTop = true;
            res();
          }
        }
      });

      //On-click hit
      $(".hit-btn").on("click", function() {
        let player_id = $(this).parent()[0].dataset["player_id"];
        mainPage.css("background-image", 'url(../images/diamondEmpty.jpg)');

        $("#batter-card").hide();
        // Post hit to season_bats_stats
        $.ajax({
          url: `batter/hits/${player_id}`,
          type: "post"
        }).then(function(data) {
          console.log(`Player ID: ${player_id} updated`);
        });

        if (isTop) {
          visHits += 1;

          baseRunning.show(visHits);

          if (visOuts < 3) {
            if (visHits >= 4) {
              visScoreInning += 1;
              $(`#visScore${inning}`).text(visScoreInning);

              visTotalSum += 1;
              $("#resultVis").text(visTotalSum.toString());
              //gif
            }
          }
        } else if (!isTop) {
          homeHits++;
          mainPage.css("background-image", 'url(../images/diamondEmpty.jpg)');
          
          baseRunning.show(homeHits);

        
          if (homeOuts < 3) {
            if (homeHits >= 4) {
              homeScoreInning += 1;
              $(`#homeScore${inning}`).text(homeScoreInning);

              homeTotalSum += 1;
              $("#resultHome").text(homeTotalSum.toString());
              //gif
            }
          }
        }
      });
    });
    
  }

  

  const baseRunning = {
    emptyBags : 'url(../images/diamondEmpty.jpg)',
    runner1: 'url(../images/diamond1stBase.jpg)',
    runner2: 'url(../images/diamond2ndBase.jpg)',
    runner3: 'url(../images/diamond3rdBase.jpg)',

    show: function(h) {
      switch (h) {
        case 0:
          mainPage.css("background-image", this.emptyBags);
          break;
        case 1:
          mainPage.css("background-image", this.runner1);
          break;
        case 2:
          mainPage.css("background-image", this.runner2);
          break;
        case 3:
        default:
          mainPage.css("background-image", this.runner3);
          break; 
      }
    }

  }

  $("#batter-card").hide();
  // Select Team for home
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
  // Select Team for away
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
  //start match
  $("#start-match").on("click", function() {
    if ($(this).text() === "Start Match") {
      startMatch(inning).then(function() {
        //async function
        console.log("Match OVER");
      });

      //Resquest gif
      // let url = `https://api.giphy.com/v1/gifs/search?q=baseball&api_key=${
      //   process.env.GIF_KEY
      // }$&limit=10`;
      // $.ajax({
      //   url,
      //   method: "GET"
      // }).then(function(response) {
      //   let result = response.data;
      //   console.log(result);

      // for(let i = 0; i < result.length; i++){
      //   let imgAnimate = result[i].images['original']['url'];
      //   $('<gif-jumbo').attr({
      //
      //     src: animate,
      //   });

      // }

      // });

      // });

      $(this)
        .attr("disable", true)
        .text("End Game");
    } else {
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
        console.log("New Match created");
      });

      $(this)
        .attr("disable", true)
        .text("Start Game");
    }
  });

  // Select Batter
  $(document).on("click", ".player-at-bat-btn", function(e) {
    let isAtBat = e.target.getAttribute("disable");
    if (isAtBat === "false") {
      let dataSet = $(this)[0].dataset;
      $("#batter-card").show();
      $("#batter-card-name").text(dataSet["name"]);
      $("#batter-card-bat_avg").text(`Batting Average: ${dataSet["bat_avg"]}`);
      $("#batter-card-roster").text(dataSet["ros"]);
      $("#batter-card-pos").text(`Position: ${dataSet["pos"]}`);
      $("#batter-card-hand").text(`Bats: ${dataSet["hand"]}`);
      $("#batter-card").attr("data-player_id", `${dataSet["player_id"]}`);
    }
    //e.currentTarget.attributes['disable'] = true;
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
