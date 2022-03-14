

const display = document.querySelector('[data-display]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const allClear = document.querySelector('[data-all-clear]')
const clear = document.querySelector('[data-delete]')
const operationNumber = document.querySelectorAll('[data-operation]')
const number = document.querySelectorAll('[data-number]')
const equals = document.querySelector('[data-equals]')


class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear()
    }
    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    appendNumber(number){
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operation){
        if (this.currentOperand === '')return
        if (this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''

    }
    compute(){
        let computation;
        const prev  = parseFloat(this.previousOperand)
        const current  = parseFloat(this.currentOperand)
        switch (this.operation){
            case '+':
               computation = prev + current
                break;
            case '-':
                computation = prev - current
                break;
            case '*':
                computation = prev * current
                break;
            case '/':
                computation = prev / current
                break;
            default:
                return;
        }
        this. currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];
        console.log(decimalDigits)
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractionDigits: 0,
            });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(
            this.currentOperand
        );
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
                this.previousOperand
            )} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = "";
        }
    }

}

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement)

number.forEach(button=>{
    button.addEventListener('click', function (){
        calculator.appendNumber(button.innerHTML)
        calculator.updateDisplay()
    })
})


operationNumber.forEach(button=>{
    button.addEventListener('click', function (){
        calculator.chooseOperation(button.innerHTML)
        calculator.updateDisplay()
    })
})

equals.addEventListener('click', function (){
    calculator.compute()
    calculator.updateDisplay()
})

allClear.addEventListener('click', function (){
    calculator.clear()
    calculator.updateDisplay()
})

clear.addEventListener('click', function (){
    calculator.delete()
    calculator.updateDisplay()
})