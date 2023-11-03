// Define an array of questions with choices and correct answers
var questions = [
  {
    question: "What does HTML stand for",
    choices: ["Hyper Transfer Markup Language", "Hyper Text Makeup Language", "Hyperlink and Text Markup Language", "Hyper Text Markup Language"],
    correctAnswer: "Hyper Text Markup Language",
  },
  {
    question: "Which programming language is used for web development?",
    choices: ["Python", "Java", "HTML", "C++"],
    correctAnswer: "HTML",
  },
  {
    question: "Which HTML tag is used for creating an unordered list?",
    choices: ["<ol>", "<ul>", "<dl>", "<li>"],
    correctAnswer: "<ul>",
  },
  {
    question: "What property in CSS is used to change the text color of an element?",
    choices: ["Text-color", "font-color", "color", "text-style"],
    correctAnswer: "color",
  },
  {
    question: "Which CSS selector targets elements with a specific class",
    choices: ["*myClass", "element.class", "#myClass", ".myClass"],
    correctAnswer: ".myClass",
  },
  {
    question: "What keyword is used to declare a variable in JavaScript?",
    choices: ["var", "variable", "let", "v"],
    correctAnswer: "var",
  },
  {
    question: "Which operator is used to compare two values for equality without checking data type in JavaScript?",
    choices: ["===", "==", "!=", "!=="],
    correctAnswer: "==",
  },
  {
    question: "How do you add an event listener to an HTML element using JavaScript?",
    choices: ["element.addEventListener('event', function)", "element.onEvent('event', function)", "element.attachEvent('event', function)", "element.addEvent('event', function)"],
    correctAnswer: "element.addEventListener('event', function)",
  }
];

// Create variables to keep track of quiz state
var currentQuestionIndex = 0;
var score = 0;
var timeLeft = 60;
var timerInterval;
var initialsEntered = false;

// Function to start the quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 60;
  startTimer();
  displayQuestion();
}

// Attach the click event listener for the "Start Quiz" button
var startButton = document.getElementById("start-button");
if (startButton) {
  startButton.addEventListener("click", startQuiz);
}

// Hide initials container by default
var initialsContainer = document.getElementById("initials-container");
initialsContainer.style.display = "none";

// Show quiz container
var quizContainer = document.getElementById("quiz-container");
quizContainer.style.display = "block";

// Function to display a question and its choices
function displayQuestion() {
  var questionObj = questions[currentQuestionIndex];
  var questionElement = document.getElementById("question");
  questionElement.textContent = questionObj.question;

  var choicesContainer = document.getElementById("choices-container");
  choicesContainer.innerHTML = "";

  var feedbackElement = document.getElementById("feedback");
  feedbackElement.textContent = ""; // Clear feedback

  for (var i = 0; i < questionObj.choices.length; i++) {
    var choiceButton = document.createElement("button");
    choiceButton.textContent = questionObj.choices[i];
    choiceButton.setAttribute("class", "choice");
    choiceButton.addEventListener("click", function (event) {
      checkAnswer(event.target.textContent);
    });
    choicesContainer.appendChild(choiceButton);
  }
}

function checkAnswer(selectedAnswer) {
  var questionObj = questions[currentQuestionIndex];
  if (selectedAnswer === questionObj.correctAnswer) {
    score++;
    updateScore();
    displayFeedback("Correct!"); // Provide feedback for correct answer
  } else {
    timeLeft -= 5;
    displayFeedback("Wrong! Try the next question."); // Provide feedback for incorrect answer
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

function displayFeedback(message) {
  var feedbackElement = document.getElementById("feedback");
  feedbackElement.textContent = message;
}

// Function to update the displayed score
function updateScore() {
  var scoreElement = document.getElementById("score");
  scoreElement.textContent = score;
}

// Function to start the timer
function startTimer() {
  timerInterval = setInterval(function () {
    var timeLeftElement = document.getElementById("time-left");
    timeLeftElement.textContent = timeLeft;
    timeLeft--;
    if (timeLeft < 0) {
      endQuiz();
    }
  }, 1000);
}

// Function to end the quiz
function endQuiz() {
  clearInterval(timerInterval);

  if (currentQuestionIndex === questions.length) {
    // Hide question and choices
    var quizContainer = document.getElementById("quiz-container");
    quizContainer.style.display = "none";

    // Display initials container
    var initialsContainer = document.getElementById("initials-container");
    initialsContainer.style.display = "block";

    var initialsInput = document.getElementById("initials");
    var submitButton = document.getElementById("submit-score");

    submitButton.addEventListener("click", function () {
      var initials = initialsInput.value.trim();
      if (initials) {
        saveScore(initials);
        displayHighScores();
        initialsEntered = true;
      } else {
        alert("Please enter your initials to save your score.");
      }
    });
  } else {
    displayHighScores();
    displayFeedback("Time's up! Your quiz has ended.");
  }
}

// Function to save the user's score
function saveScore(initials) {
  var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  var newScore = { initials: initials, score: score };
  highScores.push(newScore);
  highScores.sort((a, b) => b.score - a.score); // Sort scores in descending order
  localStorage.setItem("highScores", JSON.stringify(highScores));
}

// Function to display high scores
function displayHighScores() {
  var highScoresContainer = document.getElementById("high-scores-container");
  highScoresContainer.innerHTML = "";

  // Load high scores from localStorage
  var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  if (highScores.length === 0) {
    var noScoresMessage = document.createElement("p");
    noScoresMessage.textContent = "No high scores available.";
    highScoresContainer.appendChild(noScoresMessage);
  } else {
    var highScoresList = document.createElement("ol");
    highScoresList.setAttribute("id", "high-scores-list");

    highScores.forEach(function (score) {
      var scoreItem = document.createElement("li");
      scoreItem.textContent = score.initials + ": " + score.score;
      highScoresList.appendChild(scoreItem);
    });

    highScoresContainer.appendChild(highScoresList);
  }
}

// Attach the click event listener for the "High Scores" button
var highScoresButton = document.getElementById("high-scores-button");
if (highScoresButton) {
  highScoresButton.addEventListener("click", displayHighScores);
}