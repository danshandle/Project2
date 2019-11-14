
function match(homeTeam, awayTeam, location, startMatch) {
  /*Post to matches in baseballdb  */
  let 
    home_team_id = 1,
    away_team_id = 2,
    visScoreInning = 0,
    homeScoreInning = 0;
  startInning(home_team_id, away_team_id);
};

function startInning(){
    
    let 
        inning = 1,
        visScoreInningText = $(`#visScore${inning}`),
        homeScoreInningText = $(`#homeScore${inning}`),
        batterbox = $('#batter-card');

    visScoreInning = 0;
    homeScoreInning = 0;

    batterbox.hide();


    atBatsTop();

    
    visScoreInningText.text(visScoreInningText);
    homeScoreInningText.text(homeScoreInningText);

    inning ++;
}

function atBatsTop(){ //promises?
    let 
        outs = 0,
        hits = 0;

     do{
        $('#out-btn').on('click', function() {
         outs ++;
            console.log(outs)   
        });

        $('#hit-btn').on('click', function() {
            hits ++;
            console.log(hits)
            if(hits >= 4) {
                visScoreInning ++
             }
        });



     } while (outs < 3)
    
        atBatsBottom();
       
    


    
}

atBatsBotton
