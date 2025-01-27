import "./../styles/styles.scss" ;
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
const innerDiv = document.querySelector<HTMLDivElement>(".playerCard__question");
const title = document.querySelector<HTMLHeadElement>("#title");
const instructions = document.querySelector<HTMLButtonElement>("#instructions")
const overlay = document.querySelector<HTMLDivElement>("#overlay")

if(!currentScore || !timeRemaining || !playerAnswer|| !showHintsDiv|| !showAnswerDiv || !startGame || !instructions || !highScore || !timeRemaining || !currentQuestion || !currentHint || !hintButton || !playerAnswer || !submitButton || !startGame || !showHintsDiv || !showAnswerDiv || !answerConfirmation || !skipButton || !cardBorder || !title || !instructions || !overlay || !innerDiv){
  throw new Error ('Some elements can not be found');
}




// How long is the game (in seconds)
const GAME_TIME = 60;

let currentScoreValue: number = 0;
let highScoreValue: number = 0;

const questions = questionslist;

let questionForUser: any;
let usedQuestions: typeof questionslist

// Style border to current question
const toggleBorderStyle = () =>{
      cardBorder.classList.toggle(`${questionForUser.category.toLowerCase()}`);
      innerDiv.classList.toggle(`${questionForUser.category.toLowerCase()}Inner`);
}

// return title to original state
const phraserTitle = () =>{
  title.textContent = `Phraser`;
}

// Change title to match category
const updateCategory = () =>{
  title.textContent = `${questionForUser.category}`;
}

// Countdown timer
function startCountdown(duration: number) {

  const timer = setInterval(() => {

    if (timeRemaining) {
      timeRemaining.textContent = `Time Remaining: ${duration}`;
    }

    if (duration <= 0) {
      clearInterval(timer);
        if(timeRemaining)timeRemaining.textContent = "Time's up!";
        if(playerAnswer)playerAnswer.value = "";
        if(showHintsDiv)showHintsDiv.classList.add("hidden");
        if(showAnswerDiv)showAnswerDiv.classList.add("hidden");
        if(startGame)startGame.classList.remove("hidden");
        if(instructions)instructions.classList.remove("hidden");
        if(currentQuestion)currentQuestion.textContent = `Game Over! You scored ${currentScoreValue} and your highscore is ${highScoreValue}`;
        toggleBorderStyle();
        phraserTitle();
}

    duration--;
  }, 1000);
}

// generate random question
const randomQuestion = () => {
    if (usedQuestions.length === questions.length) {
    usedQuestions = [];
    }
  const remainingQuestions = questions.filter(q => !usedQuestions.includes(q));
  const randomNumber = Math.floor(Math.random() * remainingQuestions.length);
  return remainingQuestions[randomNumber];
}

// Logic for running game from start
const runGame = () =>{
    currentScoreValue = 0;
    currentScore.textContent = `Player Score: ${currentScoreValue}`;
    usedQuestions = [];
    const generatedQ = randomQuestion();
    questionForUser = generatedQ;
    usedQuestions.push(generatedQ);
    currentQuestion.textContent= generatedQ.question;
    toggleBorderStyle();
    updateCategory();
    hintButton.classList.remove("hidden")
    currentHint.textContent = "Need a hint?";
    startCountdown(GAME_TIME);
    showHintsDiv.classList.remove("hidden");
    showAnswerDiv.classList.remove("hidden");
    startGame.classList.add("hidden");
    instructions.classList.add("hidden");
}


// function to check is players answer matches answer stored in object

const checkAnswer = () =>{
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
        toggleBorderStyle()
        const generatedQ = randomQuestion();
        questionForUser = generatedQ;
        usedQuestions.push(generatedQ);
        toggleBorderStyle();
        updateCategory();
        currentScore.textContent = `Player Score: ${currentScoreValue}`;
        highScore.textContent = `High Score: ${highScoreValue}`
        currentQuestion.textContent = generatedQ.question;
        hintButton.classList.remove("hidden")
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
    hintButton.classList.add("hidden")
}

// skipping a question
const skipCurrentQuestion = () =>{
        toggleBorderStyle()
        const generatedQ = randomQuestion();
        questionForUser = generatedQ;
        usedQuestions.push(generatedQ);
        currentQuestion.textContent = generatedQ.question;
        toggleBorderStyle();
        updateCategory();
        hintButton.classList.remove("hidden");
        currentHint.textContent = "Need a hint?";
        playerAnswer.value = "";
}

const displayOverlay = () =>{
  overlay.style.display = "block";
}

const removeOverlay = () =>{
  overlay.style.display = "none";
}


// event listeners

startGame.addEventListener("click", runGame);
submitButton.addEventListener("click", checkAnswer);
hintButton.addEventListener("click", displayHint);
playerAnswer.addEventListener("keypress", (enter) =>{
  if(enter.key == "Enter") submitButton?.click();
})

skipButton.addEventListener("click", skipCurrentQuestion);

// to bring up overlay
instructions.addEventListener("click", displayOverlay)

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

skipButton.addEventListener("click", () =>{
  playerAnswer.focus();
});

overlay.addEventListener("click", removeOverlay)
