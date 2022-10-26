const previOper = document.querySelector("#preOpe");
const curOper= document.querySelector("#curOpe");
const buttons = document.querySelectorAll("#buttons-container button");
class Calculadora {
  constructor(previOper, curOper) {
    this.previOper = previOper;
    this.curOper =curOper;
    this.currentOperation = "";
  }
  addDigito(digito) {
    if (digito === "." && this.curOper.innerText.includes(".")) {
      return;
    }

    this.currentOperation = digito;
    this.updateScreen();
  }
  processOper(operation) {
    if (this.curOper.innerText === "" && operation !== "C") {
    
      if (this.previOper.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }

    let operationValue;
    let previous = +this.previOper.innerText.split(" ")[0];
    let current = +this.curOper.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "DEL":
        this.processDelOperator();
        break;
      case "CE":
        this.processClearCurrentOperator();
        break;
      case "C":
        this.processClearOperator();
        break;
      case "=":
        this.processEqualOperator();
        break;
      default:
        return;
    }
  }
  updateScreen(
    operationVa = null,
    opera = null,
    curr = null,
    prev = null
  ) {
    if (operationVa === null) {
      this.curOper.innerText += this.currentOperation;
    } else {
      if (prev === 0) {
        operationVa = curr;
      }
      this.previOper.innerText = `${operationVa} ${opera}`;
      this.curOper.innerText = "";
    }
  }
  changeOperation(operation) {
    const mathOperations = ["*", "-", "+", "/"];
    if (!mathOperations.includes(operation)) {
      return;
    }
    this.previOper.innerText =
      this.previOper.innerText.slice(0, -1) + operation;
  }
  processDelOperator() {
    this.curOper.innerText = this.curOper.innerText.slice(0, -1);
  }
  processClearCurrentOperator() {
    this.curOper.innerText = "";
  }
  processClearOperator() {
    this.curOper.innerText = "";
    this.previOper.innerText = "";
  }
  processEqualOperator() {
    let operation = this.previOper.innerText.split(" ")[1];

    this.processOper(operation);
  }
}
const calcula = new Calculadora(previOper,curOper);
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;
    if (+value >= 0 || value === ".") {
      calcula.addDigito(value);
    } else {
      calcula.processOper(value);
    }
  });
});