const display = document.getElementById('display');
const buttonArray = document.querySelectorAll('button');

let leftOperand = '';
let rightOperand = '';
let operator = '';

document.addEventListener("DOMContentLoaded", () => {
    buttonArray.forEach(button => {
        button.addEventListener('click', () => {
            if (/\d|\.|plus-minus/.test(button.id)) {
                concatenateOperand(button.id);
            };
            if (/[/*+%]|subtract/.test(button.id)) {
                if (operator) {
                    calculateDisplayClear();
                    operator = button.id === 'subtract' ? '-' : button.id;
                }
                else { operator = button.id === 'subtract' ? '-' : button.id; }
            }
            if (button.id === '=') { calculateDisplayClear(); };
            if (button.id === 'AC') {
                leftOperand = '';
                rightOperand = '';
                display.textContent = '0';
            }
            if (button.id === 'DEL') {
                if (rightOperand) {
                    rightOperand = rightOperand.slice(0, -1);
                    display.textContent = formatDisplay(rightOperand);
                }
                else if (leftOperand) {
                    leftOperand = leftOperand.slice(0, -1);
                    display.textContent = formatDisplay(leftOperand);
                }
            }
        });
    });
});

function add(a, b) {
    return +a + +b;
}
function subtract(a, b) {
    return +a - +b;
}
function multiply(a, b) {
    return +a * +b;
}
function divide(a, b) {
    return +a / +b;
}
function mod(a, b) {
    return +a % +b;
}
function operate(sign, a, b) {
    switch (sign) {
        case '/': return divide(a, b); break;
        case '*': return multiply(a, b); break;
        case '+': return add(a, b); break;
        case '-': return subtract(a, b); break;
        case '%': return mod(a, b); break;
    }
}
function concatenateOperand(operand) {
    if (operator === '') {
        if (leftOperand.includes('.') && operand === '.') { return; }
        if (operand == 'plus-minus') {
            leftOperand = +leftOperand * (-1);
            leftOperand = formatDisplay(leftOperand).toString();
        }
        else { leftOperand = leftOperand + operand; }
        display.textContent = leftOperand;
    }
    else {
        if (rightOperand.includes('.') && operand === '.') { return; }
        if (operand == 'plus-minus') {
            rightOperand = +rightOperand * (-1);
            rightOperand = formatDisplay(rightOperand).toString();
        }
        else { rightOperand = rightOperand + operand; }
        display.textContent = rightOperand;
    }
}
function formatDisplay(num) {
    if (Number.isInteger(+num)) { return num; }
    else { return (Math.round(num * 100) / 100).toFixed(2); }
}
function calculateDisplayClear() {
    leftOperand = operate(operator, leftOperand, rightOperand).toString();
    operator = '';
    rightOperand = '';
    display.textContent = formatDisplay(leftOperand);
}