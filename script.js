let currentQuestionIndex = 0;
let score = 0;

const questions = [
  { question: "What does HTML stand for?", answers: ["Hyper Text Markup Language", "High Text Markup Language", "Hyperlink Text Mark Language", "Home Tool Markup Language"], correct: 0 },
  { question: "What does CSS stand for?", answers: ["Cascading Style Sheets", "Colorful Style Sheets", "Computer Style Sheets", "Creative Style Sheets"], correct: 0 },
  { question: "What does JavaScript do?", answers: ["Adds interactivity to web pages", "Styles web pages", "Structures web pages", "Stores data in databases"], correct: 0 },
  { question: "Which HTML tag is used to link a CSS file?", answers: ["<css>", "<link>", "<style>", "<script>"], correct: 1 },
  { question: "How do you declare a JavaScript variable?", answers: ["var myVar;", "v myVar;", "variable myVar;", "declare myVar;"], correct: 0 },
  { question: "Which property is used to change the background color in CSS?", answers: ["bgColor", "background-color", "color-background", "background"], correct: 1 }
];

document.getElementById("start-btn").addEventListener("click", startQuiz);

function startQuiz() {
  document.getElementById("welcome-screen").style.display = "none";
  document.getElementById("quiz-container").style.display = "block";
  currentQuestionIndex = 0;
  score = 0;
  loadQuestion();
}

function loadQuestion() {
  resetState();
  const questionData = questions[currentQuestionIndex];
  document.getElementById("question").innerText = questionData.question;

  const answerButtons = document.querySelectorAll(".answer");
  answerButtons.forEach((button, index) => {
    button.innerText = questionData.answers[index];
    button.onclick = () => selectAnswer(button, index);
  });
}
function selectAnswer(button, selectedIndex) {
  const correctIndex = questions[currentQuestionIndex].correct;
  if (selectedIndex === correctIndex) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("incorrect");
    document.querySelectorAll(".answer")[correctIndex].classList.add("correct");
  }

  document.getElementById("score-display").innerText = `Score: ${score}`;
  document.querySelectorAll(".answer").forEach(btn => btn.disabled = true);
  document.getElementById("next-btn").style.display = "block";
  document.getElementById("next-btn").onclick = loadNextQuestion;
}

function loadNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
    document.getElementById("next-btn").style.display = "none";
  } else {
    showResults();
  }
}

function showResults() {
  document.getElementById("quiz-container").innerHTML = `
    <h2>Quiz Completed!</h2>
    <p>Your final score is ${score} / ${questions.length}</p>
    <button id="restart-btn">Restart Quiz</button>
  `;
  document.getElementById("restart-btn").addEventListener("click", restartQuiz);
}

function restartQuiz() {
  document.getElementById("quiz-container").innerHTML = `
    <h1>Quiz Application</h1>
    <p id="question"></p>
    <div class="answers">
      <button class="answer">Answer 1</button>
      <button class="answer">Answer 2</button>
      <button class="answer">Answer 3</button>
      <button class="answer">Answer 4</button>
    </div>
    <button id="next-btn" style="display:none;">Next Question</button>
    <p id="score-display">Score: 0</p>
  `;
  startQuiz();
}

function resetState() {
  document.querySelectorAll(".answer").forEach(button => {
    button.className = "answer";
    button.disabled = false;
  });
}