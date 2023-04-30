/* new logic 

1. press number
  - add digit to firstNumber variable
  - display firstNumber variable on display
REPEAT AS MANY TIMES AS DESIRED

2. press operator
  - firstNumber is done
  - save operator internally

3. press number
   - add digit to secondNumber var
   - display secondNumber variable on display

4. press operator
   - display result of operate()
   - set firstNumber to result
   - delete secondNumber variable

*/

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
const backButton = document.querySelector(".back");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const display = document.querySelector(".display");

backButton.addEventListener("click", back);
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

function pressOperator() {
  // handles operator chains
  if (firstNumber && !isFirstNumberComplete) {
    pressEquals();
    secondNumber = "";
  }

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

  if (
    (firstNumber || firstNumber === 0) &&
    (secondNumber || secondNumber === 0) &&
    operator
  ) {
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
    result = Math.round(result * 10000000) / 10000000;
    console.log(result);
    display.textContent = result;
  }
}

function back() {
  /* backButton functionality here */
}

function clear() {
  firstNumber = null;
  secondNumber = null;
  operator = "";
  result = null;

  isFirstNumberComplete = false;
  isSecondNumberComplete = false;
  isOperationFinished = false;

  display.textContent = "";
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
