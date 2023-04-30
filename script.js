// firstNumber operator secondNumber
// i.e. 1 + 2
let firstNumber;
let secondNumber;
let operator;

const PLUS_OPERATOR = "+";
const MINUS_OPERATOR = "-";
const MULTIPLY_OPERATOR = "*";
const DIVIDE_OPERATOR = "/";

const numberButtons = document.querySelectorAll(".num-key");
const display = document.querySelector(".display");

Array.from(numberButtons).forEach((numberButton) => {
  numberButton.addEventListener("click", pressNumber);
});

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

function operate(x, y, op) {
  if (op === PLUS_OPERATOR) return add(x, y);
  else if (op === MINUS_OPERATOR) return subtract(x, y);
  else if (op === MULTIPLY_OPERATOR) return multiply(x, y);
  else if (op === DIVIDE_OPERATOR) return divide(x, y);
}

function pressNumber() {
  firstNumber = `${firstNumber} + ${this.textContent}`;
  updateDisplay(this.textContent);
}

function updateDisplay(newText) {
  display.textContent = `${display.textContent}${newText}`;
}
