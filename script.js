let firstNumber = '';
let secondNumber = '';
let currentOperator = '';
let shouldReset = false;

const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (!isNaN(value)) {
      if (shouldReset) {
        display.value = '';
        shouldReset = false;
      }
      display.value += value;
    } else if (value === 'C') {
      display.value = '';
      firstNumber = '';
      secondNumber = '';
      currentOperator = '';
    } else if (value === '=') {
      if (firstNumber && currentOperator && display.value !== '') {
        secondNumber = display.value;
        const result = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber));
        display.value = result;
        firstNumber = result;
        currentOperator = '';
        shouldReset = true;
      }
    } else {
      // оператор
      if (display.value === '') return;
      firstNumber = display.value;
      currentOperator = value;
      shouldReset = true;
    }
  });
});

function operate(operator, a, b) {
  switch (operator) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b === 0 ? 'Ошибка' : a / b;
    default: return '';
  }
}
