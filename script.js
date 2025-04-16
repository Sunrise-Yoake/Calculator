let firstOperand = null;
let currentOperation = null;
let shouldResetDisplay = false;
let currentExpression = '';
const display = document.getElementById('display');
const expressionDisplay = document.createElement('div');
expressionDisplay.className = 'expression';
document.querySelector('.calculator').insertBefore(expressionDisplay, display);

// Основные математические операции
const operations = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '×': (a, b) => a * b,
    '÷': (a, b) => b === 0 ? null : a / b
};

// Обновление дисплея
function updateDisplay(value) {
    display.value = value;
}

// Обновление выражения
function updateExpression() {
    expressionDisplay.textContent = currentExpression;
}

// Добавление цифры на дисплей
function appendNumber(number) {
    if (display.value === '0' || shouldResetDisplay) {
        updateDisplay(number);
        shouldResetDisplay = false;
    } else {
        updateDisplay(display.value + number);
    }
}

// Добавление десятичной точки
function appendDecimal() {
    if (shouldResetDisplay) {
        updateDisplay('0.');
        shouldResetDisplay = false;
        return;
    }
    
    if (!display.value.includes('.')) {
        updateDisplay(display.value + '.');
    }
}

// Обработка операторов
function handleOperator(operator) {
    const currentValue = display.value;
    
    if (currentOperation !== null && !shouldResetDisplay) {
        calculate();
    }
    
    firstOperand = display.value;
    currentOperation = operator;
    currentExpression = `${firstOperand} ${currentOperation}`;
    updateExpression();
    shouldResetDisplay = true;
}

// Вычисление результата
function calculate() {
    if (currentOperation === null || shouldResetDisplay) return;
    
    const secondOperand = display.value;
    currentExpression += ` ${secondOperand} =`;
    updateExpression();
    
    const result = operations[currentOperation](
        parseFloat(firstOperand),
        parseFloat(secondOperand)
    );
    
    if (result === null) {
        alert("Ошибка: деление на ноль!");
        clearCalculator();
        return;
    }
    
    updateDisplay(result.toString());
    currentOperation = null;
    shouldResetDisplay = true;
    currentExpression = '';
}

// Очистка калькулятора
function clearCalculator() {
    updateDisplay('0');
    firstOperand = null;
    currentOperation = null;
    currentExpression = '';
    updateExpression();
}

// Удаление последнего символа
function backspace() {
    if (display.value.length === 1 || 
        (display.value.length === 2 && display.value.startsWith('-'))) {
        updateDisplay('0');
    } else {
        updateDisplay(display.value.slice(0, -1));
    }
}

// Обработчики событий
document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('click', () => {
        if (button.hasAttribute('data-value')) {
            appendNumber(button.textContent);
        } else if (button.hasAttribute('data-operator')) {
            handleOperator(button.textContent);
        } else if (button.hasAttribute('data-equals')) {
            calculate();
        } else if (button.hasAttribute('data-clear')) {
            clearCalculator();
        } else if (button.hasAttribute('data-decimal')) {
            appendDecimal();
        } else if (button.hasAttribute('data-backspace')) {
            backspace();
        }
    });
});

// Поддержка клавиатуры
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
    } else if (e.key === '.') {
        appendDecimal();
    } else if (['+', '-', '*', '/'].includes(e.key)) {
        const operators = {
            '+': '+',
            '-': '-',
            '*': '×',
            '/': '÷'
        };
        handleOperator(operators[e.key]);
    } else if (e.key === 'Enter' || e.key === '=') {
        calculate();
    } else if (e.key === 'Escape') {
        clearCalculator();
    } else if (e.key === 'Backspace') {
        backspace();
    }
});