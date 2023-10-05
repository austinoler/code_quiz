// Define an array of questions with choices and correct answers
var questions = [
    {
      question: "What does HTML stand for",
      choices: ["Hyper Transfer Markup Language", "Hyper Text Makeup Language","Hyperlink and Text Markup Language", "Hyper Text Markup Language"],
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
        choices: ["*myClass", "element.class", "#myClass","myClass"],
        correctAnswer: "myClass",
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
        correctAnswer: "element.addEventListener('event', function)"
    }
  ];

  // Create variables to keep track of quiz state
var currentQuestionIndex = 0;
var score = 0;
var timeLeft = 60; // Set the initial timer value in seconds
var timerInterval;

// Function to start the quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 60; // Reset the timer
  startTimer(); // Start the timer
  displayQuestion();
}

// Function to display a question and its choices
function displayQuestion() {
    var questionObj = questions[currentQuestionIndex];
    var questionElement = document.getElementById("question");
    questionElement.textContent = questionObj.question;
  
    var choicesContainer = document.getElementById("choices-container");
    choicesContainer.innerHTML = "";
  
    for (var i = 0; i < questionObj.choices.length; i++) {
      var choiceButton = document.createElement("button");
      choiceButton.textContent = questionObj.choices[i];
      choiceButton.setAttribute("class", "choice");
      choiceButton.setAttribute("data-index", i);
      choiceButton.addEventListener("click", function (event) {
        checkAnswer(event.target.textContent);
      });
      choicesContainer.appendChild(choiceButton);
    }
  };
  // Function to check the selected answer and proceed to the next question
function checkAnswer(selectedAnswer) {
  var questionObj = questions[currentQuestionIndex];
  if (selectedAnswer === questionObj.correctAnswer) {
    score++;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
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
}

document.querySelector("#start-button").addEventListener("click", startQuiz);