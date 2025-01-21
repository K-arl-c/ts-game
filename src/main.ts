import "./../styles/styles.scss" 

const currentScore = document.querySelector<HTMLParagraphElement>("#playerScore");
const highScore = document.querySelector<HTMLParagraphElement>("#highestScore");
const timeRemaining = document.querySelector<HTMLParagraphElement>("#timeRemaining");
const currentQuestion = document.querySelector<HTMLParagraphElement>("#currentQuestion");
const currentHint = document.querySelector<HTMLParagraphElement>("#promptForHint");
const hintButton = document.querySelector<HTMLButtonElement>("#hintButton");
const playerAnswer = document.querySelector<HTMLInputElement>("#playerInput")
const submitButton = document.querySelector<HTMLButtonElement>("#answerSubmit")
const startGame = document.querySelector<HTMLButtonElement>("#startGame")




// type Questions = {
//     question: string;
//     answer: string;
//     hint: string;
//     category: string;

// }


// const questionsList = {
//     questions: [
//     {questionNumber: 1, promptText: "Action of moving quickly", answer: "running" }
//     ]
// }