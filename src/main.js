
let main = document.getElementById("mainCalcInput");
let mainCalc = document.getElementById("mainCalc");

const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const otherKeys = [" "];

document.onkeydown = function (event) {
    if (event.key == "r" && event.ctrlKey == true) {
        return;
    }
    else if (letters.includes(event.key)) {
        event.preventDefault();
    }
    else {
        console.log(event);
    }
}

const result = document.getElementById("result");

function handleForm(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    let inputString = [...data.entries()][0][1];
    result.textContent = evaluate(inputString);
    console.log(inputString);
    mainCalc.reset();
}
mainCalc.addEventListener('submit', handleForm);



function evaluate(expression) {
    let tokens = expression.split('');

    // Stack for numbers: 'values'
    let values = [];

    // Stack for Operators: 'ops'
    let ops = [];

    for (let i = 0; i < tokens.length; i++) {
        // Current token is a whitespace, skip it
        if (tokens[i] == ' ') {
            continue;
        }

        // Current token is a number,
        // push it to stack for numbers
        if (tokens[i] >= '0' && tokens[i] <= '9') {
            let sbuf = "";

            // There may be more than
            // one digits in number
            while (i < tokens.length &&
                tokens[i] >= '0' &&
                tokens[i] <= '9') {
                sbuf = sbuf + tokens[i++];
            }
            values.push(parseInt(sbuf, 10));

            // Right now the i points to
            // the character next to the digit,
            // since the for loop also increases
            // the i, we would skip one
            //  token position; we need to
            // decrease the value of i by 1 to
            // correct the offset.
            i--;
        }

        // Current token is an opening
        // brace, push it to 'ops'
        else if (tokens[i] == '(') {
            ops.push(tokens[i]);
        }

        // Closing brace encountered,
        // solve entire brace
        else if (tokens[i] == ')') {
            while (ops[ops.length - 1] != '(') {
                values.push(applyOp(ops.pop(),
                    values.pop(),
                    values.pop()));
            }
            ops.pop();
        }

        // Current token is an operator.
        else if (tokens[i] == '+' ||
            tokens[i] == '-' ||
            tokens[i] == '^' ||
            tokens[i] == '*' ||
            tokens[i] == '/') {

            // While top of 'ops' has same
            // or greater precedence to current
            // token, which is an operator.
            // Apply operator on top of 'ops'
            // to top two elements in values stack
            while (ops.length > 0 &&
                hasPrecedence(tokens[i],
                    ops[ops.length - 1])) {
                values.push(applyOp(ops.pop(),
                    values.pop(),
                    values.pop()));
            }

            // Push current token to 'ops'.
            ops.push(tokens[i]);
        }
    }

    // Entire expression has been
    // parsed at this point, apply remaining
    // ops to remaining values
    while (ops.length > 0) {
        values.push(applyOp(ops.pop(),
            values.pop(),
            values.pop()));
    }

    // Top of 'values' contains
    // result, return it
    return values.pop();
}

// Returns true if 'op2' has
// higher or same precedence as 'op1',
// otherwise returns false.
function hasPrecedence(op1, op2) {
    if (op2 == '(' || op2 == ')') {
        return false;
    }
    else if ((op1 == '^') && (op2 == '*' || op2 == '/' || op2 == '+' || op2 == '-')) {
        return false;
    }
    else if ((op1 == '*' || op1 == '/') &&
        (op2 == '+' || op2 == '-')) {
        return false;
    }
    else {
        return true;
    }
}

// A utility method to apply an
// operator 'op' on operands 'a'
// and 'b'. Return the result.
function applyOp(op, b, a) {
    switch (op) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '^':
            return a ** b;
        case '/':
            if (b == 0) {
                alert("Cannot divide by zero");
            }
            return parseInt(a / b, 10);
    }
    return 0;
}
// const input = document.querySelector("#inputText")

// document.onkeydown = function (event) {
//     event = event || window.event;
//     let text;

//     switch (event.key) {
//         case "Shift":
//             return;
//         case "Alt":
//             return;
//         case "Control":
//             return;
//         case "Enter":
//             input.textContent = "";
//             return;
//         case "Backspace":
//             input.textContent = input.textContent.slice(0, input.textContent.length - 1);
//             break;
//         default:
//             text = document.createTextNode(event.key);
//     }
//     input.appendChild(text);
// };