let num1 = "";
let operator = "";
let num2 = "";
let equals = false;
const EMPTY_DISPLAY = "0.0";

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
    if (b === "0") {
        clearVariables();
        return "NO";
    }
    return Number(a) / Number(b);
}

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
    setDisplayText(EMPTY_DISPLAY);
}

function clearVariables() {
    num2 = "";
    operator = "";
    num1 = "";
}

function clearAll() {
    clearDisplay();
    clearVariables();
}

const displayText = document.querySelector(".display");

function setDisplayText(text) {
    displayText.innerText = text;
}

const numberButtons = document.querySelectorAll(".button.number");
numberButtons.forEach(button => button.addEventListener('click', function (e) {
    let numPressed = e.target.innerText;
    if (!operator) {
        num1 = num1 + numPressed;
        setDisplayText(num1);
    }
    else if (equals) {
        clearVariables();
        num1 = numPressed;
        setDisplayText(num1);
    }
    else {
        num2 = num2 + numPressed;
        setDisplayText(num2);
    }
}));

const operatorButtons = document.querySelectorAll(".button.operator");
operatorButtons.forEach(button => button.addEventListener('click', e => {
    let op = e.target.innerText;
    if (op === "=") {
        equals = true;
        setDisplayText(operate(num1, operator, num2));
    }
    else
        operator = op;
}));

const clearButton = document.querySelector(".button.clear");
clearButton.addEventListener('click', () => clearAll());

const backButton = document.querySelector(".button.back");
backButton.addEventListener('click', () => {
    let newNum = "";
    if (equals) {
        equals = false;
        newNum = num2;
    }
    else if (num2) {
        newNum = num2.slice(0, -1);
        num2 = newNum;
        if (num2 === "")
            newNum = num1;
    }
    else if (num1.length > 1) {
        newNum = num1.slice(0, -1);
        num1 = newNum;
    }
    else
        clearAll();
    setDisplayText(newNum || EMPTY_DISPLAY);
});