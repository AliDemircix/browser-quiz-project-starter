'use strict';

/**
 * Create a button element to get correct answer 
 * @returns {Element}
 */

export const createCheatButton = () => {
    const getAnswerButton = document.createElement('button');
    getAnswerButton.innerText = 'See Answer';
    return getAnswerButton;
}

export const showCorrectAnswerElement = (correctAnswer) => {
    const correctAnswerContainer = document.createElement('div');
    correctAnswerContainer.innerHTML = `'${correctAnswer}' option is correct answer of this question`;
    return correctAnswerContainer;
}