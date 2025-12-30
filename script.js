const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let firstNumber = null;
let operator = null;
let secondNumber = null;
let currentInput = "";
let lastResult = null;
let shouldResetDisplay = false;

// Basic math functions
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return b === 0 ? null : a / b;
}

// Operate function
function operate(op, a, b) {
  if (op === "+") return add(a, b);
  if (op === "-") return subtract(a, b);
  if (op === "*") return multiply(a, b);
  if (op === "/") return divide(a, b);
}

// Format result safely
function formatResult(res) {
  return Number.isInteger(res)
    ? res.toString()
    : parseFloat(res.toFixed(6)).toString();
}

// Reset everything properly
function clearAll() {
  firstNumber = null;
  secondNumber = null;
  operator = null;
  currentInput = "";
  lastResult = null;
  shouldResetDisplay = false;
  display.innerText = "0"; // force reset
}

// Button click handling
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");

    // CLEAR
    if (value === "C") {
      clearAll();
      return;
    }

    // NUMBER or OPERATOR → reset if result was shown
    if (shouldResetDisplay) {
      currentInput = "";
      shouldResetDisplay = false;
      display.innerText = "";
    }

    // NUMBER
    if (!isNaN(value)) {
      currentInput += value;
      display.innerText = currentInput;
      return;
    }

    // OPERATOR
    if (["+", "-", "*", "/"].includes(value)) {
      if (!currentInput && lastResult === null) return; // don't run on empty

      if (firstNumber === null) {
        firstNumber = Number(currentInput);
      } else if (operator && currentInput) {
        secondNumber = Number(currentInput);
        let result = operate(operator, firstNumber, secondNumber);

        if (result === null) {
          display.innerText = "Bruh… divide by 0? 🤡";
          clearAll();
          shouldResetDisplay = true;
          return;
        }

        firstNumber = Number(result);
        display.innerText = formatResult(result);
        lastResult = result;
      }

      operator = value;
      currentInput = "";
      return;
    }

    // EQUAL "="
    if (value === "=") {
      if (firstNumber !== null && operator && currentInput) {
        secondNumber = Number(currentInput);
        let result = operate(operator, firstNumber, secondNumber);

        if (result === null) {
          display.innerText = "Bruh… divide by 0? 🤡";
          clearAll();
          shouldResetDisplay = true;
          return;
        }

        display.innerText = formatResult(result);
        firstNumber = Number(result);
        lastResult = result;
        currentInput = "";
        shouldResetDisplay = true;
      }
      return;
    }
  });
});
