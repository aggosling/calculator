function add(a, b) {
    return Number(a) + Number(b);
}

function subtract(a, b) {
    return Number(a) - Number(b);
}

function multiply(a, b) {
    return Number(a) * Number(b);
}

function divide(a, b) {
    return Number(a) / Number(b);
}

let num1 = "";
let operator = "";
let num2 = "";

function operate(a, operator, b) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "x":
            return multiply(a, b);
        case "%":
            return divide(a, b);
    }
}

function clearDisplay() {
    setDisplayText("0.0");
}

function clearVariables() {
    num2 = "";
    operator = "";
    num1 = "";
}

const displayText = document.querySelector(".display");
function setDisplayText(text) {
    displayText.innerText = text;
}

const numberButtons = document.querySelectorAll(".button.number");
numberButtons.forEach(button => button.addEventListener('click', function (e) {
    let num = e.target.innerText;
    if (!operator) {
        num1 = num1 + num;
        setDisplayText(num1);
    }
    else if (operator === "=") {
        clearVariables();
        num1 = num;
        setDisplayText(num1);
    }
    else {
        num2 = num2 + num;
        setDisplayText(num2);
    }
}));

const operatorButtons = document.querySelectorAll(".button.operator");
operatorButtons.forEach(button => button.addEventListener('click', e => {
    let op = e.target.innerText;
    if (op === "=")
        setDisplayText(operate(num1, operator, num2));
    operator = op;
}));