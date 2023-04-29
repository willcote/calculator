// firstNumber operator secondNumber
// i.e. 1 + 2
let firstNumber;
let secondNumber;
let operator;

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
  if (op === "+") return add(x, y);
  else if (op === "-") return subtract(x, y);
  else if (op === "*") return multiply(x, y);
  else if (op === "/") return divide(x, y);
}
