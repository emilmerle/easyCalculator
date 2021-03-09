var calc_buttons = document.querySelector(".buttons");
var calc_input = document.querySelector("#calc_input");
var calc_result = document.querySelector("#calc_result");

calc_buttons.addEventListener("click", (event) => {

    var target = event.target;

    //if (!event.target.closest("button")) { return; }

    if (target.className == "digits") {
        if (((calc_input.innerText[calc_input.innerText.length - 2] == "/")
            || (calc_input.innerText[calc_input.innerText.length - 2] == "%")) 
            && target.value == "0") {
            calc_result.innerText = "nice try";
        } else {
            calc_input.innerText += target.value;
        }
    }

    else if(target.className == "operator") {
        calc_input.innerText += " " + target.value + " ";
    }

    else if (target.className == "decimal") {
        calc_input.innerText += ".";
    }

    else if (target.className == "clear") {
        calc_input.innerText = "";
        calc_result.innerText = 0;
    }

    else if (target.className == "equals") {
        if (!isNaN(Number(calc_input.innerText[calc_input.innerText.length-1]))
            && calc_input.innerText[calc_input.innerText.length-1] != " ") {
            var result = calculate_expression(split_expression(calc_input.innerText));
            calc_result.innerText = result;
            calc_input.innerText = "";
        }
    }
})


// Math functions:

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function divide(a, b) {
    if (b != 0){
        return a / b;
    } else {
        return undefined;
    }
}

function modulo(a, b) {
    if (b != 0){
        return a % b;
    } else {
        return undefined;
    }
}

function multiply(a, b) {
    return a * b;
}

function operate(a, b, operator) {
    a = Number(a);
    b = Number(b);

    switch (operator) {
        case "+":
            return add(a, b);

        case "-":
            return subtract(a, b);

        case "/":
            return divide(a, b);

        case "*":
            return multiply(a, b);

        case "%":
            return modulo(a, b);
    
        default:
            return undefined;
    }
}

function split_expression(expression) {
    return expression.split(" ");
}

function calculate_expression(split_expression) {
    if (!isNaN(Number(split_expression.join("")))) {
        return split_expression.join("");
    }

    var index_of_operator = split_expression.indexOf("%");
    var temp_result = 0;
    var operators = ["/", "%", "*", "+", "-"];

    for (let i = 0; i < operators.length; i++) {
        
        index_of_operator = split_expression.indexOf(operators[i]);
        if (index_of_operator == -1) {
            continue;
        }
        else {
            temp_result = operate(split_expression[index_of_operator-1], 
                split_expression[index_of_operator+1], 
                split_expression[index_of_operator]);
            split_expression.splice(index_of_operator-1, 3, temp_result);
            return calculate_expression(split_expression);
        }
    }
}

console.log(calculate_expression(split_expression("5 + 8 + 6 / 2")))