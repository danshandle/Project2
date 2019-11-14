
function match(homeTeam, awayTeam, location, startMatch) {
  /*Post to matches in baseballdb  */
  let home_team_id = 1
  let away_team_id = 2
  startInning(home_team_id, away_team_id);
};

function startInning(){
    
    let 
        inning = 1,
        visScoreInningText = $(`#visScore${inning}`),
        homeScoreInningText = $(`#homeScore${inning}`),
        batterbox = $('#batter-card')
        visScoreInning = 0,
        homeScoreInning = 0;

    batterbox.hide();


        $('#hit-btn').on("click", function(){
            console.log("hello")
        })
    Top()
    Bottom()
        
        


    visScoreInningText.text(visScoreInningText);
    homeScoreInningText.text(homeScoreInningText);

    inning ++;
}

