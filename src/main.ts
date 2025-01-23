import "./../styles/styles.scss" 
import { questionslist } from './questions';

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
const showHintsDiv = document.querySelector<HTMLDivElement>(".playerCard__hint");
const showAnswerDiv = document.querySelector<HTMLDivElement>(".playerCard__answer");
const answerConfirmation = document.querySelector<HTMLParagraphElement>("#answerConfirmation");
const skipButton = document.querySelector<HTMLButtonElement>("#skipQuestion");
const cardBorder = document.querySelector<HTMLDivElement>("#mainCard");

if(!currentScore || !highScore || !timeRemaining || !currentQuestion || !currentHint || !hintButton || !playerAnswer || !submitButton || !startGame || !showHintsDiv || !showAnswerDiv){
  throw new Error ('Some elements can not be found');
}



// How long is the game (in seconds)
const GAME_TIME = 6000

let currentScoreValue: number = 0;
let highScoreValue: number = 0;

const questions = questionslist

let questionForUser: string

// Style border to current question
const toggleStyleBorder = () =>{
      cardBorder.classList.toggle(`${questionForUser.category.toLowerCase()}`);
}

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
        toggleStyleBorder();
    }

    duration--;
  }, 1000);
}

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
    toggleStyleBorder();
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
        answerConfirmation.textContent = `${playerInput.toUpperCase()} was correct! Generating a new question...`;
        if(currentHint?.textContent === "Need a hint?"){
          currentScoreValue +=2;
        } else {
          currentScoreValue +=1;
        }
        if(currentScoreValue >= highScoreValue){
          highScoreValue = currentScoreValue
        }
        toggleStyleBorder()
        const generatedQ = randomQuestion();
        questionForUser = generatedQ;
        toggleStyleBorder()
        currentScore.textContent = `Player Score: ${currentScoreValue}`;
        highScore.textContent = `High Score: ${highScoreValue}`
        currentQuestion.textContent = generatedQ.question;
        currentHint.textContent = "Need a hint?";
        playerAnswer.value = "";
      } else {
        answerConfirmation.textContent = `${playerInput.toUpperCase()} was incorrect. Try again!`;
        playerAnswer.value = "";
        }
    }

// to display hint when requested
const displayHint = () => {
    currentHint.textContent = questionForUser.hint;
}

// skipping a question
const skipCurrentQuestion = () =>{
        toggleStyleBorder()
        const generatedQ = randomQuestion();
        questionForUser = generatedQ;
        currentQuestion.textContent = generatedQ.question;
        toggleStyleBorder()
        currentHint.textContent = "Need a hint?";
        playerAnswer.value = "";
}


// event listeners

startGame.addEventListener("click", runGame);
submitButton.addEventListener("click", checkAnswer);
hintButton.addEventListener("click", displayHint);
playerAnswer.addEventListener("keypress", (enter) =>{
  if(enter.key == "Enter") submitButton?.click();
})

skipButton.addEventListener("click", skipCurrentQuestion);

// attempting to make the start game button and submit make the users browser automatically target input
startGame.addEventListener("click", () =>{
  playerAnswer.focus();
});

submitButton.addEventListener("click", () =>{
  playerAnswer.focus();
});

hintButton.addEventListener("click", () =>{
  playerAnswer.focus();
});
