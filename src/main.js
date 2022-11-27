
var MQ = MathQuill.getInterface(2);
var answerSpan = document.getElementById('answer');
var answerMathField = MQ.MathField(answerSpan, {
    handlers: {
        edit: function () {
            var enteredMath = answerMathField.latex(); // Get entered math in LaTeX format
            // checkAnswer(enteredMath);
        }
    }
});


let answerBox = document.getElementById("answer").firstChild.firstChild;
answerBox.focus();
const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const otherKeys = [" "];

document.onkeydown = function (event) {
    answerBox.focus();
    if (event.key == "r" && event.ctrlKey == true) {
        return;
    }
    else if (event.key == "Enter") {
        console.log(rootBlock.value);
    }
    else if (letters.includes(event.key)) {
        event.preventDefault();
    }
    else {
        console.log(event.key);
    }
}
