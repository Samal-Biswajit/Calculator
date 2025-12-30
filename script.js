const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");

    if (value === "=") {
      try {
        currentInput = eval(currentInput).toString();
        display.innerText = currentInput;
      } catch {
        display.innerText = "Error";
        currentInput = "";
      }
    } else {
      currentInput += value;
      display.innerText = currentInput;
    }
  });
});
