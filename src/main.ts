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
const showHintsDiv = document.querySelector<HTMLDivElement>(".playerCard__hint")
const showAnswerDiv = document.querySelector<HTMLDivElement>(".playerCard__answer")



// How long is the game (in seconds)
const GAME_TIME = 10

let currentScoreValue: number = 0;
let highScoreValue: number = 0;


let questionForUser: string

// Countdown timer
function startCountdown(duration: number) {

  const timer = setInterval(() => {

    if (timeRemaining) {
      timeRemaining.textContent = `Time Remaining: ${duration}`;
    }

    if (duration <= 0) {
      clearInterval(timer);
        timeRemaining.textContent = "Time's up!";
        showHintsDiv.classList.add("hidden");
        showAnswerDiv.classList.add("hidden");
        startGame.classList.remove("hidden");
        currentQuestion.textContent = `Game Over! You scored ${currentScoreValue} and your highscore is ${highScoreValue}`;
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

// Logic for running game from start
const runGame = () =>{
    currentScoreValue = 0;
    currentScore.textContent = `Player Score: ${currentScoreValue}`;
    const generatedQ = randomQuestion();
    questionForUser = generatedQ;
    currentQuestion.textContent= generatedQ.question;
    currentHint.textContent = "Need a hint?";
    startCountdown(GAME_TIME);
    showHintsDiv.classList.remove("hidden");
    showAnswerDiv.classList.remove("hidden");
    startGame.classList.add("hidden");
}
// function to check is players answer matches answer stored in object

const checkAnswer = () =>{
    const generatedQ = randomQuestion()
    const playerInput = playerAnswer?.value.trim().toLowerCase();

      if (playerInput === questionForUser.answer.toLowerCase()) {
        alert("Correct! Generating a new question...");
        if(currentHint?.textContent === "Need a hint?"){
          currentScoreValue +=2;
        } else {
          currentScoreValue +=1;
        }
        if(currentScoreValue >= highScoreValue){
          highScoreValue = currentScoreValue
        }
        const generatedQ = randomQuestion();
        questionForUser = generatedQ;
        currentScore.textContent = `Player Score: ${currentScoreValue}`;
        highScore.textContent = `High Score: ${highScoreValue}`
        currentQuestion.textContent = generatedQ.question;
        currentHint.textContent = "Need a hint?";
        playerAnswer.value = "";
      } else {
        alert("Incorrect!");
        playerAnswer.value = "";
        }
    }

// to display hint when requested
const displayHint = () => {
    currentHint.textContent = questionForUser.hint;
}

// event listeners

startGame.addEventListener("click", runGame);
submitButton.addEventListener("click", checkAnswer);
hintButton.addEventListener("click", displayHint);
playerAnswer.addEventListener("keypress", (enter) =>{
  if(enter.key == "Enter") submitButton?.click();
})

// attempting to make the start game button and submit make the users browser automatically target input
startGame.addEventListener("click", () =>{
  playerAnswer.focus();
});

submitButton.addEventListener("click", () =>{
  playerAnswer.focus();
});