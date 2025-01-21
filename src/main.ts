import "./../styles/styles.scss" 

// Query Selectors
const currentScore = document.querySelector<HTMLParagraphElement>("#playerScore");
const highScore = document.querySelector<HTMLParagraphElement>("#highestScore");
const timeRemaining = document.querySelector<HTMLParagraphElement>("#timeRemaining");
const currentQuestion = document.querySelector<HTMLParagraphElement>("#currentQuestion");
const currentHint = document.querySelector<HTMLParagraphElement>("#promptForHint");
const hintButton = document.querySelector<HTMLButtonElement>("#hintButton");
const playerAnswer = document.querySelector<HTMLInputElement>("#playerInput");
const submitButton = document.querySelector<HTMLButtonElement>("#answerSubmit");
const startGame = document.querySelector<HTMLButtonElement>("#startGame");

// game is 120 seconds long
const GAME_TIME = 120

let questionForUser: string

// Countdown timer
function startCountdown(duration: number) {

  const timer = setInterval(() => {

    if (timeRemaining) {
      timeRemaining.textContent = `Time Remaining: ${duration}`;
    }

    if (duration <= 0) {
      clearInterval(timer);
      if (timeRemaining) {
        timeRemaining.textContent = "Time's up!";
      }
     
    }

    duration--;
  }, 1000);
}


// Questions / prompts for game - TO DO - put this on a seperate doc to import

const questions: {question: string, answer: string, hint: string, category: string}[] = [
    {question: "Star Wars Creator", answer: "George Lucas", hint: "Famous for a galaxy far, far away", category: "People"},
    {question: "UK island, south of England", answer: "Isle of Wight", hint: "Famous for a music festival and white cliffs.", category: "World"},
    {question: "Alerts you when visitors arrive", answer: "Doorbell", hint: "Usually rings or chimes when pressed", category: "Object"},
    {question: "Sound of something hot cooking", answer: "Sizzling", hint: "Common when frying or grilling", category: "Action"},
    {question: "Friendly marine mammal", answer: "Dolphin", hint: "Known for jumping and playful behaviour", category: "Nature"}
]

// generate random question
const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random()*questions.length);
    return questions[randomNumber];
}

// logic for the game running
const runGame = () =>{
    const generatedQ = randomQuestion()
    questionForUser = generatedQ;
    currentQuestion.textContent= generatedQ.question;
    currentHint.textContent = "Need a hint?";
    startCountdown(GAME_TIME);
};

// function to check is players answer matches answer stored in object

const checkAnswer = () =>{
    const generatedQ = randomQuestion()
    const playerInput = playerAnswer?.value.trim().toLowerCase();

      if (playerInput === questionForUser.answer.toLowerCase()) {
        alert("Correct! Generating a new question...");
        const generatedQ = randomQuestion();
        questionForUser = generatedQ;
        currentQuestion.textContent = generatedQ.question;
        currentHint.textContent = "Need a hint?";
        playerAnswer.value = "";
      } else {
        alert("Incorrect!");
        }
    }

// to display hint when requested
const displayHint = () => {
    currentHint.textContent = questionForUser.hint;
}

// event listeners

startGame.addEventListener("click", runGame);
submitButton.addEventListener("click", checkAnswer);
hintButton?.addEventListener("click", displayHint);