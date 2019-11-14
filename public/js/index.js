const backgrounds = new Array( //array of background images
  "url(../images/diamondEmpty.jpg)",
  "url(../images/diamond1stBase.jpg)",
  "url(../images/diamond2ndBase.jpg)",
  "url(../images/diamond3rdBase.jpg)"
);

var mainPage = $("body");
//mainPage.css("background-image", backgrounds[0] + "top center no-repeat");
let current = 0; //resets base indicator to empty at start of inning

let ids = []

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function () {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function (id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  },
  getBatter: function(id) {
    return $.ajax({
      url: "batter/" + id,
      type: "get"
    })
  },
  updateHits: function(id) {
    return $.ajax({
      url: "batter/hits/" + id,
      type: "get"
    })
  },
  updateOuts: function(id) {
    return $.ajax({
      url: "batter/outs/" + id,
      type: "get"
    })
  }
};

$("#hitbutton").on("click", function() {
  console.log("hit");
  current++;
  mainPage.css("background-image", backgrounds[current]);
  $("#batterbox").empty()
  //no need for logic to keep the baserunner indicator with bases loaded as current increments beyond
  // the array length and will not change the image. Image change will occur when inning changes side
  API.updateHits(ids[ids.length - 1]).then(function(data){
    console.log(data)
  })
});
$("#outbutton").on("click", function() {
  console.log("out")
  $("#batterbox").empty()
  API.updateOuts(ids[ids.length - 1]).then(function(data) {
    console.log(data)
  })
})

$(".player").on("click", function() {
    $("#batterbox").empty()
    ids.push(this.id)
  API.getBatter(this.id).then(function(data){
    $("#batterbox").append(data)   
  });
});

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function () {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

