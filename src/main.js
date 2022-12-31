
console.log("Switch windows with alt+j");

let latestInput = "";
let resultDisplay = document.getElementById("result");
let resultInput = document.getElementById("resultInput");

var MQ = MathQuill.getInterface(2);
var answerSpan = document.getElementById('answer');
var answerMathField = MQ.MathField(answerSpan, {
    handlers: {
        edit: function () {
            latestInput = answerMathField.latex(); // Get entered math in LaTeX format
            // checkAnswer(enteredMath);
        },
        enter: function () {
            console.log(latestInput);
            let fn = evaluatex(latestInput.toString());
            let result = +fn().toFixed(10);
            if (result == "Infinity") {
                // result = "Is that actually what you want me to calculate?";
            }
            resultDisplay.textContent = result;
            resultInput.textContent = latestInput;
            MQ.StaticMath(resultInput);
            console.log(result);
            answerMathField.select();
            answerMathField.keystroke("Backspace");
        }
    }
});

let answerBox = document.getElementById("answer").firstChild.firstChild;
answerBox.focus();

let calcWindow = document.getElementById("calculatorWindow");
let graphWindow = document.getElementById("graphWindow");

document.onkeydown = function (event) {
    answerBox.focus();
    if (event.key == "r" && event.ctrlKey == true) {
        return;
    }
    else if (event.key == "j" && event.altKey == true) {
        calcWindow.style.display = "none";
        graphWindow.style.opacity = "1";
    }
    else {
        console.log(event);
    }
}




