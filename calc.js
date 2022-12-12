const numbers = document.querySelectorAll('.number-btn');
const operators = document.querySelectorAll('.operators-btn');
const previousOperand = document.querySelector('.previous');
const currentOperand = document.querySelector('.current');
const clearBtn = document.querySelector('.C-btn');
const equalBtn = document.querySelector('.equal-btn');
const delBtn = document.querySelector('.del-btn');

// Creating a class for the calculator
class Calculator{
  constructor(){
      this.firstOperand = '';
      this.secondOperand = '';
      this.operation = undefined;
  }

  addNumber(number){
      if (number === '.' && this.firstOperand.includes('.')) return
      this.firstOperand = this.firstOperand.toString() + number.toString();
  }

  //Function for performing the operation
  operate(){
      let result;
      const first = Number(this.firstOperand);
      const second = Number(this.secondOperand);
      if(isNaN(first) || isNaN(second)) return
      switch(this.operation){
          case '+':
              result = second + first;
              break;
          case '-':
              result = second - first;
              break;
          case 'x':
              result = second * first;
              break;
          case '÷':
              result = second / first;
              break;
          case '%':
              result = second % first;
              break;
          default: return; 
      }
      this.firstOperand = result;
      this.operation = undefined;
      this.secondOperand = '';
  }

  addOperation(operation){
      if(this.firstOperand === '') return;
      this.operation = operation;
      this.secondOperand = this.firstOperand;
      this.firstOperand = '';
  }

  //Function for clearing the input
  clear(){
      this.firstOperand = '';
      this.secondOperand = '';
      this.operation = undefined;
      previousOperand.textContent = '';
      currentOperand.textContent = '';
  }

  //Function for backspace
  delete(){
      this.firstOperand = this.firstOperand.toString().slice(0,-1);
  }

  updateDisplay(){
      currentOperand.textContent = this.firstOperand;
      if(this.operation !== undefined){
          previousOperand.textContent = `${this.secondOperand} ${this.operation} ${this.firstOperand}`;
          currentOperand.textContent = '';
      }
  }
}

// Inheriting the class
const calculator = new Calculator();

numbers.forEach(button => {
  button.addEventListener('click',() => {
      calculator.addNumber(button.textContent);
      calculator.updateDisplay();
  })
})

operators.forEach(button => {
  button.addEventListener('click', () => {
      calculator.addOperation(button.textContent);
      calculator.updateDisplay();
  })
})

equalBtn.addEventListener('click', () => {
  calculator.operate();
  calculator.updateDisplay();
  previousOperand.textContent = '';
})

clearBtn.addEventListener('click', () => {
  calculator.clear();
})

delBtn.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
})