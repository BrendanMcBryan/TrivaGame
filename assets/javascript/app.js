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
      "https://commons.wikimedia.org/wiki/File:Africa_(orthographic_projection).svg#/media/File:Africa_(orthographic_projection).svg"
  },

  {
    questiontype: "tf",
    question: "Antartica is a larger area than Europe.",
    answers: ["true", "false"],
    correctanswerindex: 0,
    correctText: "Antartica is 5.4 square miles, compared to Europe's 3.9",
    qimageurl:
      "https://commons.wikimedia.org/wiki/File:Antarctica_(orthographic_projection).svg#/media/File:Antarctica_(orthographic_projection).svg"
  },

  {
    questiontype: "multi",
    question: "Which is the longest river in the World?",
    answers: ["Amazon", "Mississippi", "Deleware", "Nile"],
    correctanswerindex: 3,
    correctText: "That's right, the Nile is 4,132 miles long!",
    qimageurl:
      "https://commons.wikimedia.org/wiki/File:Evening,_Nile_River,_Uganda.jpg#/media/File:Evening,_Nile_River,_Uganda.jpg"
  },

  {
    questiontype: "multi",
    question: "Which of these countries has the smallest area?",
    answers: ["Canada", "Russia", "Brazil", "China"],
    correctanswerindex: 2,
    correctText:
      "Correct! Despite being very large, Brazil is smaller than those other three",
    qimageurl:
      "https://commons.wikimedia.org/wiki/File:BRA_orthographic.svg#/media/File:BRA_orthographic.svg"
  },

  {
    questiontype: "tf",
    question: "The Earth's surface is about 95% covered by water.",
    answers: ["true", "false"],
    correctanswerindex: 1,
    correctText: "Yup, the Earth's surface is only about 71% covered by water.",
    qimageurl:
      "https://commons.wikimedia.org/wiki/File:Clouds_over_the_Atlantic_Ocean.jpg#/media/File:Clouds_over_the_Atlantic_Ocean.jpg"
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

function showresults(winloss) {
  scoreText =
    "You've guessed " +
    gameScore +
    " of " +
    triviaQuestions.length +
    " questions correct";
  var imageDiv = document.getElementById("resultImg");
  var imgURL = theQuestion.qimageurl;

  var imgURLtext = "'<img src='" + imgURL + "' >'";
  if (winloss === "correct") {
    $("#scoreDiv").text(scoreText);
    $("#resultDiv").text(theQuestion.correctText);

    imageDiv.innerHTML(imgURLtext);
    $("#resultImg").css("display", "block");

    // console.log(theQuestion.correctText);
    $("#resultDiv").css("display", "block");
  } else if (winloss === "incorrect") {
    $("#scoreDiv").text(scoreText);
  } else if (winloss === "notime") {
    $("#scoreDiv").text(scoreText);
  }
}

function endGame() {
  console.log("that's all folks!");
  stopClock();
  $("#metabuttons").css("display", "block");
  $("#gameCard").css("display", "none");
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
