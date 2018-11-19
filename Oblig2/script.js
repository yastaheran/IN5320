//Hide all areas except selectionArea
$("#selectionArea, #specificationArea, #resultArea, #alertArea, #emailArea").hide();

//dadjoke
var dadjoke = "";
$.getJSON("https://icanhazdadjoke.com/").done(function(result) {
  dadjoke = result.joke;
  document.getElementById("joke").innerHTML = dadjoke;
}).fail(function(error) {
  handleFetchError(error);
});

//Get list of all categories and append to the selectionArea
function selection() {
  $("#start").hide();
  $("#selectionArea").fadeIn("slow");
  //Get list of all categories and append to the selectionArea
  $.getJSON("https://icanhazdadjoke.com/").done(function(result) {
    dadjoke = result.joke;
    document.getElementById("joke2").innerHTML = dadjoke;
  }).fail(function(error) {
    handleFetchError(error);
	});

  fetch("https://opentdb.com/api_category.php")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var list = data.trivia_categories;
      list.forEach(function(quiz){
        var categoryList = document.getElementById("quizList");
        var listElement = document.createElement("li");
        var name = document.createTextNode(quiz.name);

        listElement.appendChild(name);
        listElement.setAttribute("id", quiz.id);
        listElement.setAttribute("class", "quiz");
        categoryList.appendChild(listElement);
      });

      //Adding eventListeners to trigger next page
      document.querySelectorAll(".quiz").forEach(function(quiz) {
       quiz.addEventListener("click", function() {
          toSpecification(quiz.id);
        });
      });
    })
    .catch(function(error) {
      handleFetchError(error);
    });
}
//Handles fetch errors
function handleFetchError(response) {
  $("#start, #selectArea, #specificationArea, #resultArea, #emailArea").hide();
  $("#alertArea").show();
  $(".alert").html( "Something went wrong. We were unable to retrieve any quiz data.<br><br> <picture> <source srcset='http://placekitten.com/g/600/300' media='(max-width: 780px)'> <source srcset='http://placekitten.com/g/500/300' media='(max-width: 600px)'><source srcset='http://placekitten.com/g/365/120' media='(max-width: 400px)'><source srcset='http://placekitten.com/g/989/400'><img src='http://placekitten.com/g/989/400' alt='Kitten'></picture>");
}

//Quiz specification
function toSpecification(id) {
  var db= "https://opentdb.com/api.php",
      level = "",
      numberOfQs = 0;

  //Hide the current area and show the specificationArea
  $("#selectionArea, #start" ).hide();
  $("#specificationArea").fadeIn("slow");

  //Dadjoke
  $.getJSON("https://icanhazdadjoke.com/").done(function(result) {
    dadjoke = result.joke;
    document.getElementById("joke3").innerHTML = dadjoke;
  });

  //get input from user
  $("#generateQBtn").click(function() {
    level = $("#level").val();
    numberOfQs = $("#num").val();

    //get questions and pass quiz data
    var query = db + "?amount=" + numberOfQs + "&category=" + id + "&difficulty=" + level + "&type=multiple";

    getQuiz(query, "same-origin");
  });

}

function getQuiz(query) {
  fetch(query)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      showQuiz(data.results);
    })
    .catch(function(error) {
      handleFetchError(error);
    });
}

//Shows a new quiz with answers
function showQuiz(questions) {
  //quiz area
  $("#specificationArea, #emailArea").hide();
  $("#resultArea").fadeIn("slow");

  //check if there is any data received from the database
  if(questions === undefined || questions == 0) {
    handleEmptyResult();
  }

  //variables
  var q = "";
  var a = "";

  //Display all questions
  $.each(questions, function() {
    q = this.question;
    a = this.correct_answer;
    $("#quizArea").append("<p class='trivia'><strong>Q</strong>: " + q + "<br>" + "<strong> A: </strong>" + a + "</p>");
  });
}

function composeSlack(id) {
  $("#specificationArea, #resultArea").hide();
  $("#emailArea").fadeIn("slow");

  var text = $(id).clone().find('br').prepend('\r\n').end().text();
  var $temp = $('<textarea>').appendTo('body').val(text).select();
  document.execCommand('copy');
  $temp.remove();

}

function sendSlack() {
  var settings = {
    url: "https://hooks.slack.com/services/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",
    method: "POST",
    dataType: "application/x-www-form-urlencoded",
    data: {
      "payload": JSON.stringify({text: $("#message").val()})
    }
  }

  $("#message").val('');
  $("#message").attr("placeholder","Your message is sent. Check slack");

  $.ajax(settings).done(function(response) {
    console.log(response);
  });

  return false;
}

function handleEmptyResult() {
  $("#start, #selectArea, #specificationArea, #resultArea, #emailArea").hide();
  $("#alertArea").show();
  $(".alert").html( "We don't have that many trivia questions that fits your specifications. Try again by clicking the main header.<br><br> <picture> <source srcset='http://placekitten.com/g/600/300' media='(max-width: 780px)'> <source srcset='http://placekitten.com/g/500/300' media='(max-width: 600px)'><source srcset='http://placekitten.com/g/365/120' media='(max-width: 400px)'><source srcset='http://placekitten.com/g/989/400'><img src='http://placekitten.com/g/989/400' alt='Kitten'></picture>");
}
