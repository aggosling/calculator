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
    return a / b;
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
        case "X":
            return multiply(a, b);
        case "%":
            return divide(a, b);
    }
}

const numberButtons = document.querySelectorAll(".button.number");
numberButtons.forEach(button => button.addEventListener('click', function (e) {
    let num = e.target.innerText;
    if (!operator)
        num1 = num1 + num;
    else
        num2 = num2 + num;
    console.log(typeof num + "//" + operator + "//" + num2);
}));