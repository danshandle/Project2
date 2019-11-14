


function match(homeTeam, awayTeam, location, startMatch) {

  /*Post to matches in baseballdb  */
  let 
    home_team_id = 1,
    away_team_id = 2,
    inning = 1,
    visScoreInning = 0,
    homeScoreInning = 0;
  startInning(home_team_id, away_team_id);
};

function startInning(){
    
    let 
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
    if(inning >9 ) {
        endGame();
    } else {
        
        startInning();
    }
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

function atBatsBotton() {
    console.log("home Team turn")
}

$(document).on("click", '#start-match',function(){
    console.log("game started")
    startInning()
})