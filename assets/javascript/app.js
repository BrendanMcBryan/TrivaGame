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

for (var i = 0; i < triviaQuestions.length; i++) {
  console.log(triviaQuestions[i].questiontype);
  console.log(triviaQuestions[i].question);
  for (var j = 0; j < triviaQuestions[i].answers.length; j++) {
    console.log(triviaQuestions[i].answers[j]);
  }
  num = triviaQuestions[i].correctanswerindex;
  console.log("correct answere is: " + triviaQuestions[i].answers[num]);
  console.log(triviaQuestions[i].correctText);

  console.log(triviaQuestions[i].qimageurl);
}
