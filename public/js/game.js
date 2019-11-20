



function match(homeTeam, awayTeam) {

  /*Post to matches in baseballdb  */
  let 
    home_team_id = homeTeam,
    away_team_id = awayTeam,
    inning = 1,
    visScoreInning = 0,
    homeScoreInning = 0;
  startInning(inning);


};

function startInning(inning){
    
    let 
        visScoreInningText = $(`#visScore${inning}`),
        homeScoreInningText = $(`#homeScore${inning}`),
        batterbox = $('#batter-card');


    visScoreInning = 0;
    homeScoreInning = 0;


    // visScoreInning = 0;
    // homeScoreInning = 0;
    batterbox.hide();
    

    
    visScoreInningText.text(visScoreInningText);
    homeScoreInningText.text(homeScoreInningText);

    inning ++;
    if(inning >9 ) {
        endGame();
    } else {
        atBatsTop();   
    }
}
function atBatsTop(){ //promises?
    let 
        outs = 0,
        hits = 0;
        

        while(outs < 3){


        
            $('.out-btn').on('click', function() {
            outs ++;
                console.log(outs)   
            });

            $('.hit-btn').on('click', function() {
                hits ++;
                console.log(hits)
                if(hits >= 4) {
                    visScoreInning ++
                }
            });     
        }
    
        atBatsBottom();
    
    
}

function atBatsBottom() {


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

// $(document).on("click", '#start-match',function(e){
//     console.
    
//     let
//         homeTeam = $('.home-team-btn',
//         awayTeam = $('.away-team-btn');


//     console.log("game started");
//     console.log(homeTeam);
//     console.log(awayTeam);
//     //match(homeTeam, awayTeam);
// })