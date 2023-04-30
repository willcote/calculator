// firstNumber operator secondNumber
// i.e. 1 + 2
let firstNumber;
let secondNumber;
let operator;
let result;

const MAX_NUMBER_INPUT = 10;

// - isFirstNumberComplete and isSecondNumberComplete
// are true for the moment after they are "locked in"
// - as soon as another number is pressed, they go back to false
let isFirstNumberComplete = false;
let isSecondNumberComplete = false;
let isOperationFinished = false;

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
  else if (op === DIVIDE_OPERATOR && parseFloat(y) == 0) return "don't";
  else if (op === DIVIDE_OPERATOR) return divide(x, y);

  operator = "";
}

function pressNumber() {
  isOperationFinished = false;

  // Putting this here means the number stays on the display until the next
  // number is entered.
  if (isFirstNumberComplete) {
    display.textContent = "";
    isFirstNumberComplete = false;
  }

  // runs when previous operation is over
  if (isSecondNumberComplete) {
    display.textContent = "";
    isSecondNumberComplete = false;
  }

  updateDisplay(this);
}

function isDisplayNaN() {
  // handles non-number messages in display
  // isNaN coerces parameter into a number - text will be true
  if (isNaN(display.textContent)) clear();
}

function pressOperator() {
  isDisplayNaN();

  // normal behavior
  operator = this.classList.contains("plus")
    ? PLUS_OPERATOR
    : this.classList.contains("minus")
    ? MINUS_OPERATOR
    : this.classList.contains("multiply")
    ? MULTIPLY_OPERATOR
    : DIVIDE_OPERATOR;

  storeNumber(display.textContent);

  console.log(`in pressOperator: ${firstNumber} ${operator} ${secondNumber}`);
}

function pressEquals() {
  /*
  
  If isFirstNumberComplete is false, either we're
  on the first number still (before pressing an operator)
  or the second number has begun typing
  (because isFirstNumberComplete is only true
  for the time after pressing the operator and before
  pressing another number).

  */

  if (firstNumber && !isFirstNumberComplete && !isOperationFinished) {
    secondNumber = display.textContent;
    isSecondNumberComplete = true;
    isOperationFinished = true;
  }

  if (firstNumber && secondNumber && operator) {
    result = operate(firstNumber, secondNumber, operator);
    // display.textContent = result;
    updateDisplay();
    firstNumber = result;
  }

  console.log(`in pressEquals: ${firstNumber} ${operator} ${secondNumber}`);
}

function storeNumber(num) {
  if (!isFirstNumberComplete) {
    firstNumber = num;
    isFirstNumberComplete = true;
  } else if (isOperationFinished === true) {
  } else {
    secondNumber = num;
  }
}

function updateDisplay(numKey) {
  // if there's no numKey, it's being called from pressEquals()
  // which means it has to show an evaluation

  if (numKey && display.textContent.length < MAX_NUMBER_INPUT) {
    display.textContent = display.textContent + numKey.textContent;
  } else if (!numKey) {
    if (typeof result === "number") {
      result = Math.round(result * 10000000) / 10000000;
      display.textContent = result;
    } else {
      display.textContent = result;
      firstNumber = null;
      secondNumber = null;
      console.log(firstNumber + " " + secondNumber);
    }
  }
}

function clear() {
  firstNumber = null;
  secondNumber = null;
  operator = null;
  result = null;

  isFirstNumberComplete = false;
  isSecondNumberComplete = false;
  isOperationFinished = false;

  display.textContent = "";
}

/* bugs

 after displaying error message for divide by 0:
 - tries to do calculation with 

*/

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
