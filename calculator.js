let num1 = "";
let operator = "";
let num2 = "";
let equals = false;
const EMPTY_DISPLAY = "0";

function add(a, b) {
    return (Number(a) * 10 + Number(b) * 10) / 10;
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
        return "N08H3D";
    }
    return Number(a) / Number(b);
}

function operate(a, operator, b) {
    switch (operator) {
        case "+":
            return String(add(a, b));
        case "-":
            return String(subtract(a, b));
        case "x":
        case "*":
            return String(multiply(a, b));
        case "÷":
        case "/":
            return String(divide(a, b));
    }
}

function isDecimal(numberStr) {
    return numberStr.indexOf(".") > -1;
}

function roundDecimal(numberStr) {
    if (numberStr.length > 7)
        return Number(numberStr).toFixed(5);
    return numberStr;
}

function clearDisplay() {
    setDisplayText(EMPTY_DISPLAY);
}

function clearVariables() {
    num2 = "";
    operator = "";
    num1 = "";
    equals = false;
}

function clearAll() {
    clearDisplay();
    clearVariables();
}

function switchPlusMinus(numberStr) {
    return numberStr[0] === "-" ? numberStr.substring(1) : "-" + numberStr;
}

function setDisplayText(text) {
    if (isDecimal(text))
        displayText.innerText = roundDecimal(text);
    else
        displayText.innerText = text;
}

function operatorEvent(e) {
    let op = e.key || e.target.innerText;
    if (op === "=" || op === "Enter") {
        // If no operator and 2nd number to calculate, ignore equals button
        if (!operator || !num2)
            return;
        equals = true;
        num1 = operate(num1, operator, num2);
        setDisplayText(num1);
        num2 = "";
    }
    else if (operator && num2) {
        equals = false;
        num1 = operate(num1, operator, num2);
        setDisplayText(num1);
        num2 = "";
        operator = op;
    }
    else {
        equals = false;
        operator = op;
    }
}

function numberEvent(e) {
    let numPressed = e.key || e.target.innerText;
    console.log(numPressed);
    if (!operator) {
        num1 += numPressed;
        setDisplayText(num1);
    }
    else if (equals) {
        clearVariables();
        num1 = numPressed;
        setDisplayText(num1);
    }
    else {
        num2 += numPressed;
        setDisplayText(num2);
    }
}

function backEvent() {
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
}

function decimalEvent() {
    if (num2 && !isDecimal(num2)) {
        num2 += ".";
        setDisplayText(num2);
    }
    else if (!isDecimal(num1)) {
        num1 += ".";
        setDisplayText(num1);
    }
}

const displayText = document.querySelector(".display");

const numberButtons = document.querySelectorAll(".button.number");
numberButtons.forEach(button => button.addEventListener('click', numberEvent));

const operatorButtons = document.querySelectorAll(".button.operator");
operatorButtons.forEach(button => button.addEventListener('click', operatorEvent));

const clearButton = document.querySelector(".button.clear");
clearButton.addEventListener('click', () => clearAll());

const backButton = document.querySelector(".button.back");
backButton.addEventListener('click', backEvent);

const plusMinusButton = document.querySelector(".button.plus-minus");
plusMinusButton.addEventListener('click', () => {
    if (num2) {
        num2 = switchPlusMinus(num2);
        setDisplayText(num2);
    }
    else {
        num1 = switchPlusMinus(num1);
        setDisplayText(num1);
    }
});

const decimalButton = document.querySelector(".button.decimal");
decimalButton.addEventListener('click', decimalEvent);

const keyPressed = document.querySelector("body");
keyPressed.addEventListener('keydown', e => {
    console.log(e.key);
    if (/^[0-9]$/i.test(e.key))
        numberEvent(e);
    else if (["+", "-", "=", "/", "*", "x", "Enter"].indexOf(e.key) > -1)
        operatorEvent(e);
    else if (e.key === ".")
        decimalEvent();
    else if (e.key === "Backspace")
        backEvent();
    else if (e.key === "Escape")
        clearAll();
});