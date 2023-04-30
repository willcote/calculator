// firstNumber operator secondNumber
// i.e. 1 + 2
let firstNumber;
let secondNumber;
let operator;
let isFirstNumberComplete = false;

const PLUS_OPERATOR = "+";
const MINUS_OPERATOR = "-";
const MULTIPLY_OPERATOR = "*";
const DIVIDE_OPERATOR = "/";

const numberButtons = document.querySelectorAll(".num-key");
const operatorButtons = document.querySelectorAll(".operator-key");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const display = document.querySelector(".display");

equalsButton.addEventListener("click", pressEquals);
clearButton.addEventListener("click", clear);

Array.from(numberButtons).forEach((numberButton) => {
  numberButton.addEventListener("click", pressNumber);
});

Array.from(operatorButtons).forEach((operatorButton) => {
  operatorButton.addEventListener("click", pressOperator);
});

function add(x, y) {
  return +x + +y;
}

function subtract(x, y) {
  return +x - +y;
}

function multiply(x, y) {
  return +x * +y;
}

function divide(x, y) {
  return +x / +y;
}

function operate(x, y, op) {
  if (op === PLUS_OPERATOR) return add(x, y);
  else if (op === MINUS_OPERATOR) return subtract(x, y);
  else if (op === MULTIPLY_OPERATOR) return multiply(x, y);
  else if (op === DIVIDE_OPERATOR) return divide(x, y);

  operator = "";
  firstNumber = secondNumber;
}

function pressNumber() {
  // Putting this here means the number stays on the display until the next
  // number is entered.
  if (isFirstNumberComplete) {
    display.textContent = "";
    isFirstNumberComplete = false;
  }

  display.textContent = display.textContent + this.textContent;
}

function pressOperator() {
  operator = this.classList.contains("plus")
    ? PLUS_OPERATOR
    : this.classList.contains("minus")
    ? MINUS_OPERATOR
    : this.classList.contains("multiply")
    ? MULTIPLY_OPERATOR
    : DIVIDE_OPERATOR;

  storeNumber(display.textContent);

  console.log(`${firstNumber} ${operator}`);
}

function storeNumber(num) {
  if (!isFirstNumberComplete) {
    firstNumber = num;
    isFirstNumberComplete = true;
  } else {
    secondNumber = num;
    // isFirstNumberComplete = false;
  }
}

function pressEquals() {
  if (!isFirstNumberComplete) secondNumber = display.textContent;
  console.table(firstNumber, secondNumber, operator);
  if (firstNumber && secondNumber && operator)
    display.textContent = operate(firstNumber, secondNumber, operator);
}

function clear() {
  firstNumber = 0;
  secondNumber = 0;
  operator = "";
  display.textContent = "";
  isFirstNumberComplete = false;
}

/* value logic

1. press buttons for NUM1 
  - NUM1 displayed as selected
2. press OPERATOR
  - NUM1 is complete
3. press buttons for NUM2
  - NUM1 display cleared
  - NUM2 displayed as selected
4. press equals 
  - NUM2 is complete
  - operate() called
  - display answer

OR

1. press buttons for NUM1 
  - NUM1 displayed as selected)
2. press OPERATOR
  - NUM1 is complete
3. press buttons for NUM2
  - NUM1 display cleared
  - NUM2 displayed as selected
4. press OPERATOR 
  - NUM2 is complete
  - operate() called
  - display answer
  - NUM2 becomes NUM1
  - start again from 3.
*/
