const numbers = document.querySelectorAll(".number");
const calculator = document.querySelector(".wrapper");
const printout = document.querySelector(".printout");
const printArea = document.querySelector(".printout p");
const operators = document.querySelectorAll(".operator");
const screenCalc = document.querySelector("div.screen");
const screen = document.querySelector("div.screen p.num");
const screenOpr = document.querySelector("div.screen p.opr");
const equal = document.querySelector("button.sum");
const reset = document.querySelector(".reset");
const undo = document.querySelector(".undo");
const print = document.querySelector(".print");
const power = document.querySelector(".power");
const ledLigth = document.querySelector(".led");

let operatorSymbol = "";
let content = "";
let calc = [];
let outcome = "";
let isAfterOutcome = false;
let printMemory = "";

//działanie poszczególnych klawiszy


numbers.forEach((number) => {
    number.addEventListener("click", () => {
        if (number.className === "number off") return;
        if (screen.textContent.length === 10) return;
        if (dotChecker(content) === false || (content[content.length - 1] === "." || typeof content[content.length - 1] === "string")) { //nie pozwala wpisać trzech kropek w całym działaniu
            if (isAfterOutcome == false) {
                // ta część oprócz wpisywania cyfr kontroluje również działanie kropki, tak by nie można jej było wpisać dwa razy obok siebie
                if (content[content.length - 1] !== ".") {
                    if (number.textContent === "0" && !content || number.textContent === "0" && content[content.length - 1] === operatorSymbol) {
                        content += `.`;
                        screen.textContent = content;
                    } else {
                        content += number.textContent;
                        screen.textContent = content;
                    }
                } else if ((content[content.length - 1] === ".") && number.textContent === ".") {
                    return;
                } else if ((content[content.length - 1] === ".") && number.textContent !== ".") {
                    content += number.textContent;
                    screen.textContent = content;
                }
            } else if (isAfterOutcome == true && operatorSymbol != "") {
                isAfterOutcome = false;
                if (content[content.length - 1] !== ".") {
                    if (number.textContent === "0" && !content || number.textContent === "0" && content[content.length - 1] === operatorSymbol) {
                        content += `.`;
                        screen.textContent = content;
                    } else {
                        // screen.textContent += number.textContent;
                        content += number.textContent;
                        screen.textContent = content;
                    }
                } else if ((content[content.length - 1] === ".") && number.textContent === ".") {
                    return;
                } else if ((content[content.length - 1] === ".") && number.textContent !== ".") {
                    content += number.textContent;
                    screen.textContent = content;
                }
            } else if (isAfterOutcome == true && operatorSymbol == "") { //ta część kontroluje zachowanie wyświetlacza po wyświetlenie wyniku działania
                if (content[content.length - 1] !== ".") {
                    if (number.textContent === "0" && !content || number.textContent === "0" && content[content.length - 1] === operatorSymbol) {
                        // || typeof content[content.length - 1] === "string"
                        content = `.`;
                        screen.textContent = content;

                    } else if (number.textContent === "0" && content) {
                        isAfterOutcome = false;
                        // screen.textContent = number.textContent;
                        content = `.`;
                        screen.textContent = content;

                    } else {
                        isAfterOutcome = false;
                        // screen.textContent = number.textContent;

                        content = number.textContent;
                        screen.textContent = content;

                    }
                } else if ((content[content.length - 1] === ".") && number.textContent === ".") {
                    return;
                } else if ((content[content.length - 1] === ".") && number.textContent !== ".") {
                    content += number.textContent;
                    screen.textContent = content;
                }
            }
        }
    });
});

//funkcja, która sprawdza czy znaki po lewej i prawej stronie operatora zawierają kropkę, a następnie przekazuje false lub true do forEacha na przyciskach

const dotChecker = (x) => {
    if (!operatorSymbol) {
        if (x.includes(".")) {
            return true;
        } else if (!x.includes(".")) {
            return false;
        }
    } else if (operatorSymbol) {
        let index = x.indexOf(operatorSymbol);
        let tempContent = x.slice(index + 1, x.length);
        if (tempContent.includes(".")) {
            return true;
        } else if (!tempContent.includes(".")) {
            return false;
        }
    }
}

//wpisywanie operatorów

operators.forEach((operator) => {
    operator.addEventListener("click", () => {
        // screen.textContent += operator.textContent;
        if (screen.textContent.length === 10) return;
        if (content[content.length - 1] !== operatorSymbol) {
            if (!operatorSymbol) {
                if (content) {
                    content += operator.textContent;
                    operatorSymbol = operator.textContent;
                    screen.textContent = content;
                } else if (!content && operator.textContent === "-") {
                    content += operator.textContent;
                    operatorSymbol = operator.textContent;
                    screen.textContent = content;
                }
            } else if (operatorSymbol && operatorSymbol === "-") {
                if (((content[0] === "-") && operator.textContent !== "-") && !twoMinuses(content)) {
                    content += operator.textContent;
                    operatorSymbol = operator.textContent;
                    screen.textContent = content;
                } else if (((content[0] === "-") && operator.textContent === "-") && !twoMinuses(content)) {
                    content += operator.textContent;
                    operatorSymbol = operator.textContent;
                    screen.textContent = content;

                }
            }
        }
    })
})

//funkcja, która nie pozwala na wpisanie trzeciego minusa

const twoMinuses = (x) => {
    let arr = x.split("");
    arr.splice(0, 1);
    arr.splice(arr.length - 1, 1);
    if (arr.includes("-")) {
        return true;
    } else {
        return false;
    }
}

//funkcja czyszcząca

const resetAll = () => {
    screen.textContent = "";
    content = "";
    calc = [];
    operatorSymbol = "";
    isAfterOutcome = false;
    if (calculator.className === "wrapper print" && printout.className === "printout print") {
        calculator.classList.remove("print");
        printout.classList.remove("print");
    }
}
reset.addEventListener("click", resetAll);

//funkcja znaku równości

const outcomeInTheEnd = () => {
    printMemory += content;
    calc = content.split(operatorSymbol);
    if (calc.length === 0) return;
    let minus = false;
    console.log(calc);
    if (calc[0] === "") {
        calc.splice(0, 1);
        minus = true;
    }
    if (minus) { //działanie znaku równości gdy pierwszą liczba jest liczba minusowa
        outcome = parseFloat(-calc[0]) - parseFloat(calc[1]);
        minus = false;
    } else if (!minus) {
        switch (operatorSymbol) {
            case "+":
                outcome = parseFloat(calc[0]) + parseFloat(calc[1]);
                console.log(calc);
                break;
            case "-":
                outcome = parseFloat(calc[0]) - parseFloat(calc[1]);
                console.log(calc);
                break;
            case "*":
                outcome = parseFloat(calc[0]) * parseFloat(calc[1]);
                break;
            case "/":
                outcome = parseFloat(calc[0]) / parseFloat(calc[1]);
                break;
        }
    }

    if (isNaN(outcome)) {
        screen.textContent = 0;
    } else {
        if (Number.isInteger(parseFloat(outcome))) {
            // screen.textContent = parseFloat(outcome);
            operatorSymbol = "";
            content = parseFloat(outcome);
            content = String(content);
            content = zeroKiller(content);
            screen.textContent = content;
            calc = [];
            isAfterOutcome = true;
            printMemory += "=" + content + "<br>";
        } else if (!Number.isInteger(parseFloat(outcome))) {
            screen.textContent = parseFloat(outcome).toFixed(5);
            operatorSymbol = "";
            content = parseFloat(outcome).toFixed(5);
            content = String(content);
            content = zeroKiller(content);
            screen.textContent = content;
            calc = [];
            isAfterOutcome = true;
            printMemory += "=" + content + "<br>";
        }
    }
}


equal.addEventListener("click", outcomeInTheEnd);


undo.addEventListener("click", () => {
    // content = content.toString();
    let arr = content.split("");

    let last = arr.splice(content.length - 1);
    console.log(last);
    content = arr.join("");
    // let lastContChar = content.slice(content.length - 1);
    // lastContChar = content.lastIndexOf(lastContChar);
    // content = content.replace(lastContChar, "");
    // content = parseInt(content);

    screen.textContent = content;
    console.log(content);
    isAfterOutcome = false;
    if (last[0] === operatorSymbol) {
        operatorSymbol = "";
    }
    // lastContChar = "";
})

// funkcja usuwająca zera

const zeroKiller = (content) => {
    let arr = content.split("");
    let zero = 0;
    if (content.includes(".")) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[(arr.length - 1) - i] === "0") {
                zero++;
            } else if (arr[(arr.length - 1) - i] !== "0") {
                break;
            }
        }
    }
    arr.splice(arr.length - zero);
    content = arr.join("");
    return content;
}

//obsługa klawiatury

// const keyboard = (e) => {
//     window.addEventListener("keydown", keyboard)
//     switch (e.keyCode) {
//         case 97:
//             content += "1";
//             screen.textContent = content;
//             break;
//         case 98:
//             content += "2";
//             screen.textContent = content;
//             break;
//         case 99:
//             content += "3";
//             screen.textContent = content;
//             break;
//         case 100:
//             content += "4";
//             screen.textContent = content;
//             break;
//         case 101:
//             content += "5";
//             screen.textContent = content;
//             break;
//         case 102:
//             content += "6";
//             screen.textContent = content;
//             break;
//         case 103:
//             content += "7";
//             screen.textContent = content;
//             break;
//         case 104:
//             content += "8";
//             screen.textContent = content;
//             break;
//         case 105:
//             content += "9";
//             screen.textContent = content;
//             break;
//         case 96:
//             content += "0";
//             screen.textContent = content;
//             break;
//         case 110:
//             content += ".";
//             screen.textContent = content;
//             break;

//     }
//     return content;
// }

// window.addEventListener("keydown", keyboard)

const printing = () => {
    if (printMemory === "") {
        alert("By móc drukować, wykonaj najpierw jakieś obliczenia!")
    } else {
        calculator.classList.toggle("print");
        printout.classList.toggle("print");
        printArea.innerHTML = printMemory;
    }
}

print.addEventListener("click", printing);

//działanie przycisku POWER

const powerPlay = () => {
    numbers.forEach((number) => {
        number.classList.toggle("off");
    })
    operators.forEach((operator) => {
        operator.classList.toggle("off");
    })
    undo.classList.toggle("off");
    print.classList.toggle("off");
    // power.classList.toggle("off");
    screenCalc.classList.toggle("off");
    reset.classList.toggle("off");
    equal.classList.toggle("off");
    ledLigth.classList.toggle("off");
    screen.textContent = "";
    calculator.classList.remove("print");
    printout.classList.remove("print");
}

power.addEventListener("click", powerPlay);