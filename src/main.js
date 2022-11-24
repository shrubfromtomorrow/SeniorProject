
const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const otherKeys = [" "];
let latestInputString = "";

document.onkeydown = function (event) {
    if (event.key == "r" && event.ctrlKey == true) {
        return;
    }
    else if (letters.includes(event.key)) {
        event.preventDefault();
    }
    else if (event.key == "Backspace") {
        latestInputString = latestInputString.substring(0, latestInputString.length - 1);
        console.log(latestInputString);
    }
    else {
        latestInputString += event.key;
        console.log(latestInputString);
    }
}

var MQ = MathQuill.getInterface(2);
var problemSpan = document.getElementById('problem');
MQ.StaticMath(problemSpan);
var answerSpan = document.getElementById('answer');
var answerMathField = MQ.MathField(answerSpan, {
    handlers: {
        edit: function () {
            var enteredMath = answerMathField.latex(); // Get entered math in LaTeX format
            // checkAnswer(enteredMath);
        }
    }
});