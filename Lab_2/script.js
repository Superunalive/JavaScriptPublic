// файл script.js
window.onload = function(){ 

let a = ''
let b = ''
let expressionResult = ''
let selectedOperation = null

// окно вывода результата
outputElement = document.getElementById("result")

// список объектов кнопок циферблата (id которых начинается с btn_digit_)
digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

function onDigitButtonClicked(digit) {
    if (!selectedOperation) {
        if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
            a += digit
        }
        outputElement.innerHTML = a
    } else {
        if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
            b += digit
            outputElement.innerHTML = b
        }
    }
}

// установка колбек-функций на кнопки циферблата по событию нажатия
digitButtons.forEach(button => {
    button.onclick = function() {
        const digitValue = button.innerHTML
        onDigitButtonClicked(digitValue)
    }
});

function updateButtons() {
    const selectedValue = document.getElementById("list").value;
  
    if (selectedValue != 1) {
      document.getElementById("btn_op_clear").innerHTML = 'D'
      document.getElementById("btn_op_sign").innerHTML = '^2'
      document.getElementById("btn_op_percent").innerHTML = 'CH4'
    } else {
      document.getElementById("btn_op_clear").innerHTML = 'C'
      document.getElementById("btn_op_sign").innerHTML = '+/-'
      document.getElementById("btn_op_percent").innerHTML = '%'
    }
  }

document.getElementById("list").addEventListener("change", updateButtons);

document.addEventListener("DOMContentLoaded", updateButtons);

// установка колбек-функций для кнопок операций
document.getElementById("btn_op_mult").onclick = function() { 
    if (a === '') return
        selectedOperation = 'x'
        document.getElementById("btn_op_mult").innerHTML = 'x'
        return
}
document.getElementById("btn_op_plus").onclick = function() { 
    if (a === '') return
    selectedOperation = '+'
}
document.getElementById("btn_op_minus").onclick = function() { 
    if (a === '') return
    selectedOperation = '-'
}
document.getElementById("btn_op_div").onclick = function() { 
    if (a === '') return
    selectedOperation = '/'
}
document.getElementById("btn_op_percent").onclick = function() { 
    if (a === '') return
    if (document.getElementById("list").value == 1){
    selectedOperation = '%'
    return
    }
    else {
    selectedOperation = 'H'
    }
}

// кнопка очищения
document.getElementById("btn_op_clear").onclick = function() {
    if (document.getElementById("list").value == 1){ 
    a = ''
    b = ''
    selectedOperation = ''
    expressionResult = ''
    outputElement.innerHTML = 0
    }
    else{
    if (a === '') return
    if (b === '') {
        a = (a - (a % 10)) / 10
        outputElement.innerHTML = a
    }
    else {
        b = (b - (b % 10)) / 10
        outputElement.innerHTML = b
    }
    }
}

document.getElementById("btn_op_sign").onclick = function() { 
    if (a === '') return
    if (document.getElementById("list").value != 1) {
        if (b === '') {
            a = (+a) * (+a)
            outputElement.innerHTML = a
        }
        else {
            b = (+b) * (+b)
            outputElement.innerHTML = b
        }
    }
    else {
        if (b === '') {
            a = -a
            outputElement.innerHTML = a
            return
            }
            else {
            b = -b
            outputElement.innerHTML = b
            }
    }
}

// кнопка расчёта результата
document.getElementById("btn_op_equal").onclick = function() { 
    if (a === '' || b === '' || !selectedOperation)
        return
        
    switch(selectedOperation) { 
        case 'x':
            expressionResult = (+a) * (+b)
            break;
        case '+':
            expressionResult = (+a) + (+b)
            break;
        case '-':
            expressionResult = (+a) - (+b)
            break;
        case '/':
            expressionResult = (+a) / (+b)
            break;
        case '%':
            expressionResult = (+a) % (+b)
            break;
        case 'H':
            if ((+a)/2 >= (+b)) {expressionResult = (+b)}
            else {expressionResult = (+a)/4}
            break;
    }
    
    a = expressionResult.toString()
    b = ''
    selectedOperation = null

    outputElement.innerHTML = a
}
};