
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
            console.log(result);
            answerMathField.select();
            answerMathField.keystroke("Backspace");
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
        // let rootBlock = document.getElementById("answer").children[1];
        // let rootBlockChildren = rootBlock.children;
        // let rootBlockChildrenValues = [];
        // let childrenNum = 1;
        // for (let i = 0; i < rootBlockChildren.length - 1; i++) {
        //     rootBlockChildrenValues.push(rootBlockChildren[i].textContent);
        //     childrenNum += 1;
        // }
        // console.log(rootBlockChildrenValues);
        // for (let i = 0; i < childrenNum; i++) {
        //     rootBlock.firstElementChild.remove();
        // }
    }
    else if (letters.includes(event.key)) {
        // event.preventDefault();
    }
    else {
        // console.log(event.key);
    }
}

document.onclick = function () {
    answerBox.focus();
}
