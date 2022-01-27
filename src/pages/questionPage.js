"use strict";

import { ANSWERS_LIST_ID } from "../constants.js";
import { NEXT_QUESTION_BUTTON_ID } from "../constants.js";
import { getQuestionElement } from "../views/questionView.js";
import { createAnswerElement } from "../views/answerView.js";
import {
  createCheatButton,
  showCorrectAnswerElement,
} from "../views/cheatAnswerView.js";
import { showScoreElement } from "../views/showScoreView.js";
import { quizData } from "../data.js";
import { router } from "../router.js";
let counter = 0;
export const initQuestionPage = (userInterface) => {
  userInterface.appendChild(
    showScoreElement(counter, quizData.questions.length)
  );
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  const questionElement = getQuestionElement(currentQuestion.text);
  userInterface.appendChild(questionElement);
  const answersListElement = document.getElementById(ANSWERS_LIST_ID);
  for (const [key, answerText] of Object.entries(currentQuestion.answers)) {
    const answerElement = createAnswerElement(key, answerText);
    if (key === currentQuestion.correct) {
      answerElement.setAttribute("data-correct", "correct");
    }
    answersListElement.appendChild(answerElement);
    answerElement.addEventListener("click", getAnswer);
  }

  // get next question handler
  document
    .getElementById(NEXT_QUESTION_BUTTON_ID)
    .addEventListener("click", isAnswerSelected);
};
// check answers if correct or not
let isSelectedOneAnswer = false;

const getAnswer = (e) => {
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  if (!isSelectedOneAnswer) {
    const answer = e.target.innerText;
    currentQuestion.selected = answer.charAt(0);
    const isAnswerCorrect =
      currentQuestion.selected === currentQuestion.correct;
    showAnswerIsCorrect(isAnswerCorrect, e.target);
    isSelectedOneAnswer = true;
  }
};
// Show user if user selection correct or not
const showAnswerIsCorrect = (isAnswerCorrect, target) => {
  if (isAnswerCorrect) {
    setBackgroundColor("green", target);
    counter++;
  } else {
    setBackgroundColor("red", target);
    showCorrect();
  }
};

// Change options backgroundColor
const setBackgroundColor = (color, target) => {
  target.style.backgroundColor = color;
};

// Show user correct answer if selected wrong answer
const showCorrect = () => {
  const correctOption = document.querySelector(`li[data-correct="correct"]`);
  setBackgroundColor("green", correctOption);
};

const nextQuestion = () => {
  isSelectedOneAnswer = false;
  quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;
  router("question");
};
const isAnswerSelected = () => {
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  currentQuestion.selected === null
    ? alert("please select any option")
    : nextQuestion();
};
