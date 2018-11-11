const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const screen = document.querySelector("div.screen p.num");
const screenOpr = document.querySelector("div.screen p.opr");
const equal = document.querySelector("button.sum");
const reset = document.querySelector(".reset");
const undo = document.querySelector(".undo");

let operatorSymbol = "";
let content = "";
let calc = [];
let outcome = "";
let isAfterOutcome = false;



numbers.forEach((number) => {
    number.addEventListener("click", () => {
        if (isAfterOutcome == false) {
            // screen.textContent += number.textContent;
            content += number.textContent;
            screen.textContent = content;
        } else if (isAfterOutcome == true && operatorSymbol != "") {
            isAfterOutcome = false;
            // screen.textContent += number.textContent;
            content += number.textContent;
            screen.textContent = content;
        } else if (isAfterOutcome == true && operatorSymbol == "") {
            isAfterOutcome = false;
            // screen.textContent = number.textContent;
            content = number.textContent;
            screen.textContent = content;
        }
    });
});

operators.forEach((operator) => {
    operator.addEventListener("click", () => {
        // screen.textContent += operator.textContent;
        content += " " + operator.textContent + " "; //dodanie spacji, tak by móc na ich podstawie zrobić tablicę
        screen.textContent = content;
        operatorSymbol = operator.textContent;
    })
})

reset.addEventListener("click", () => {
    screen.textContent = "";
    content = "";
    operatorSymbol = "";
    isAfterOutcome = false;
})

equal.addEventListener("click", () => {
    calc = content.split(' '); //podzielić tablicę tylko nawiasami
    switch (operatorSymbol) {
        case "+":
            outcome = parseFloat(calc[0]) + parseFloat(calc[2]);
            break;
        case "-":
            outcome = parseFloat(calc[0]) - parseFloat(calc[2]);
            break;
        case "*":
            outcome = parseFloat(calc[0]) * parseFloat(calc[2]);
            break;
        case "/":
            outcome = parseFloat(calc[0]) / parseFloat(calc[2]);
            break;
    }

    if (Number.isInteger(parseFloat(outcome))) {
        // screen.textContent = parseFloat(outcome);
        operatorSymbol = "";
        content = parseFloat(outcome);
        screen.textContent = content;
        calc = [];
        isAfterOutcome = true;
    } else {
        // screen.textContent = parseFloat(outcome).toFixed(2);
        operatorSymbol = "";
        content = parseFloat(outcome);
        screen.textContent = content;
        calc = [];
        isAfterOutcome = true;
    }
})

undo.addEventListener("click", () => { //czasem przy wpisaniu kropki i wcisniecue undo kasuje inna liczbe
    content = content.toString();
    let lastContChar = content.slice(content.length - 1);
    if (lastContChar !== " ") {
        content = content.replace(lastContChar, "");
    } else if (lastContChar === " ") {
        content = content.replace(content.slice(content.length - 2), "");
    }
    // content = parseInt(content);
    screen.textContent = content;
    console.log(content);
})

// naprawić działania gdy minus jest pierwszym znakiem i ogólnie gdy pierwszy znak to nie liczba
// gdy wstawimy dwa operatory pod rząd
// gdy równa się wciśniemy po liczbie lub na początku

// powtórzenie operacji przy ponownym wciśnięciu równania?