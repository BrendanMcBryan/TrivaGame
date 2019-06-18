// variables needed
// Trivia Questions Array of objects
triviaQuestions = [
  {
    questiontype: "multi",
    question: "Which continent has the most humans living on it?",
    answers: ["North America", "South America", "Africa", "Europe"],
    correctanswerindex: 2,
    correctText: "Correct! Africa has ≈ 1.2 billion people living on it.",
    qimageurl:
      "https://upload.wikimedia.org/wikipedia/commons/8/86/Africa_%28orthographic_projection%29.svg"
  },

  {
    questiontype: "tf",
    question: "Antartica is a larger area than Europe.",
    answers: ["true", "false"],
    correctanswerindex: 0,
    correctText: "Antartica is 5.4 square miles, compared to Europe's 3.9",
    qimageurl:
      "https://upload.wikimedia.org/wikipedia/commons/f/f2/Antarctica_%28orthographic_projection%29.svg"
  },

  {
    questiontype: "multi",
    question: "Which is the longest river in the World?",
    answers: ["Amazon", "Mississippi", "Deleware", "Nile"],
    correctanswerindex: 3,
    correctText: "That's right, the Nile is 4,132 miles long!",
    qimageurl:
      "https://upload.wikimedia.org/wikipedia/commons/a/a1/Evening%2C_Nile_River%2C_Uganda.jpg"
  },

  {
    questiontype: "multi",
    question: "Which of these countries has the smallest area?",
    answers: ["Canada", "Russia", "Brazil", "China"],
    correctanswerindex: 2,
    correctText:
      "Correct! Despite being very large, Brazil is smaller than those other three",
    qimageurl:
      "https://upload.wikimedia.org/wikipedia/commons/b/be/Mapa_do_Brasil_com_a_Bandeira_Nacional.png"
  },

  {
    questiontype: "tf",
    question: "The Earth's surface is about 95% covered by water.",
    answers: ["true", "false"],
    correctanswerindex: 1,
    correctText: "Yup, the Earth's surface is only about 71% covered by water.",
    qimageurl:
      "https://upload.wikimedia.org/wikipedia/commons/2/22/Earth_Western_Hemisphere_transparent_background.png"
  }
];
var clockRunning = false;
var intervalId;
var time = 0;
var qAsked = 0;
var qNum = -1;
var gameScore = 0;
var timeperq = 5;

// test to make sure i can access all info from array of objects Above.

// for (var i = 0; i < triviaQuestions.length; i++) {
//   console.log(triviaQuestions[i].questiontype);
//   console.log(triviaQuestions[i].question);
//   for (var j = 0; j < triviaQuestions[i].answers.length; j++) {
//     console.log(triviaQuestions[i].answers[j]);
//   }
//   num = triviaQuestions[i].correctanswerindex;
//   console.log("correct answere is: " + triviaQuestions[i].answers[num]);
//   console.log(triviaQuestions[i].correctText);

//   console.log(triviaQuestions[i].qimageurl);
// }

//Functions to run App
function startClock() {
  console.log("you got to Start Clock");
  if (!clockRunning) {
    intervalId = setInterval(count, 1000);
    clockRunning = true;
  }
}
function stopClock() {
  clearInterval(intervalId);
  timeperq = 5;
  time = 0;
  clockRunning = false;
}

function count() {
  time++;
  var converted = timeConverter(time);
  // console.log(converted);
  $("#timerDiv").text(converted);
  if (converted === 0) {
    timesUp();
  }
}

//Funciton adjusted from Stopwatch game
function timeConverter(t) {
  var minutes = Math.floor(t / 60);
  var seconds = t - minutes * 60;

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  if (minutes === 0) {
    minutes = "00";
  } else if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return timeperq - seconds;
}

function startGame() {
  // console.log("you got to Start Game");
  $("#gameCard").css("display", "block");
  $("#timerSection").css("display", "block");
  $("#metabuttons").css("display", "none");

  newQuestion();
}

function newQuestion() {
  hideresults();
  startClock();
  qAsked++;
  qNum++;
  theQuestion = triviaQuestions[qNum];
  var guessDiv = document.getElementById("gameGuessChoices");
  guessDiv.innerHTML = "";
  qText = theQuestion.question;
  qAns = theQuestion.answers;
  qRight = theQuestion.correctanswerindex;
  $("#gameQuestion").text(qText);
  // This section add the answer div/buttons

  for (var z = 0; z < qAns.length; z++) {
    var answerbutton = document.createElement("div");
    var anstext = qAns[z];

    // console.log(anstext);
    answerbutton.textContent = anstext;
    if (z === qRight) {
      answerbutton.id = "rightAnswer";
    } else {
      answerbutton.classList.add("wronganswer");
    }
    answerbutton.classList.add("answerbtn");

    // // answerbutton.attr("data-answerslot", i);
    guessDiv.appendChild(answerbutton);
    // console.log(answerbutton.text);
  }

  $("#rightAnswer").on("click", correctAnswer);
  $(".wronganswer").on("click", incorrectAnswer);
}

function getTrivia() {}

function correctAnswer() {
  // console.log("Correct Answer");
  stopClock();
  gameScore++;
  showresults("correct");
  if (qAsked == triviaQuestions.length) {
    setTimeout(endGame, 3000);
  } else {
    setTimeout(newQuestion, 3000);
  }
}

function incorrectAnswer() {
  // console.log("Inorrect Answer");

  stopClock();
  showresults("incorrect");
  if (qAsked === triviaQuestions.length) {
    setTimeout(endGame, 3000);
  } else {
    setTimeout(newQuestion, 3000);
  }
}
function timesUp() {
  // console.log("Times Up!");
  stopClock();
  showresults("notime");
  if (qAsked == triviaQuestions.length) {
    setTimeout(endGame, 3000);
  } else {
    setTimeout(newQuestion, 3000);
  }
}
function hideresults() {
  $("#resultImg").css("display", "none");
  $("#resultDiv").css("display", "none");
  $("#correctscreen").css("display", "None")
  $("#incorrectscreen").css("display", "None")
  $("#timesscreen").css("display", "None")
}

function showresults(winloss) {
  totalQ = qNum + 1;
  scoreText =
    "You've guessed " + gameScore + " of " + totalQ + " questions correct";
  var imageDiv = $("#resultImg");
  var imgURL = theQuestion.qimageurl;
  imageDiv.attr("src", imgURL);


  if (winloss === "correct") {
    $("#scoreDiv").text(scoreText);
    $("#resultDiv").text(theQuestion.correctText);

    $("#resultImg").css("display", "block");
    $("#correctscreen").css("display", "block");

    // console.log(theQuestion.correctText);
    $("#resultDiv").css("display", "block");
  } else if (winloss === "incorrect") {
    $("#scoreDiv").text(scoreText);
    $("#incorrectscreen").css("display", "block");
  } else if (winloss === "notime") {
    $("#timesscreen").css("display", "block");
    $("#scoreDiv").text(scoreText);
  }
}

function endGame() {
  console.log("that's all folks!");
  stopClock();
  $("#metabuttons").css("display", "block");
  $("#gameCard").css("display", "none");
  hideresults();
  $("#gameCard").css("display", "none");
  $("#timerSection").css("display", "none");

}

function updateProgress() {}

// App logic
//jQuery to load when page loads
window.onload = function() {
  $("#startButton").on("click", startGame);
  // $("#stop").on("click", stop);
  // $("#reset").on("click", reset);
  // $("#start").on("click", start);
};
