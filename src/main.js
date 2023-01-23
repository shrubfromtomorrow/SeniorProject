
console.log("Switch windows with alt+j. Sqrt with alt+r, pi with alt+p. alt+up gives most recent input in regular calc. alt+s shows the graph input window. ` clears the window. alt+down clears the regular calc input.");

let replacements = {
    "\\pi": "PI",
}

let altEvents = ["p", "r"];
let recentResults = [];

let recentInputs = [];
let selectedInputChild = 0;

let latestInput = "";
let latestSubmittedInput = "";
let resultDisplays = document.getElementsByClassName("result");
let resultCont = document.getElementsByClassName("resultCont")[0];
let resultContChildren = resultCont.children;
let resultInputs = document.getElementsByClassName("resultInput");


var MQ = MathQuill.getInterface(2);
var answerSpan = document.getElementById('answer');
var answerMathField = MQ.MathField(answerSpan, {
    handlers: {
        edit: function () {
            latestInput = answerMathField.latex(); // Get entered math in LaTeX format
            // checkAnswer(enteredMath);
        },
        enter: function () {
            latestSubmittedInput = latestInput;
            if (latestInput.toString().includes("\\pi")) {
                latestInput = latestInput.replace("\\pi", "PI");
            }
            console.log(latestInput);
            let fn = evaluatex(latestInput.toString());
            let result = +fn().toFixed(10);
            if (result == "Infinity") {
                result = "Why do you to calculate big numbers?";
            }
            recentResults.push(result);
            recentInputs.push(latestInput);
            resultCont.appendChild(document.createElement("div")).setAttribute("class", "result");
            resultCont.appendChild(document.createElement("div")).setAttribute("class", "resultInput");
            for (let i = 0; i < recentResults.length; i++) {
                resultDisplays[i].textContent = recentResults[i];
                resultInputs[i].textContent = recentInputs[i];
                MQ.StaticMath(resultInputs[i]);
            }
            console.log(result);
            // answerMathField.select();
            // answerMathField.keystroke("Backspace");
        }
    }
});

let answerBox = document.getElementById("answer").firstChild.firstChild;
answerBox.focus();

let calcWindow = document.getElementsByClassName("calculatorWindow")[0];
let graphWindow = document.getElementsByClassName("graphWindow")[0];

let activeWindow = "calculator";

document.onkeydown = function (event) {
    answerBox.focus();
    if (event.key == "r" && event.ctrlKey == true) {
        return;
    }
    else if (event.key == "j" && event.altKey == true) {
        if (activeWindow == "calculator") {
            calcWindow.style.visibility = "hidden";
            graphWindow.style.visibility = "visible";
            activeWindow = "graph"
        }
        else if (activeWindow == "graph") {
            graphWindow.style.visibility = "hidden";
            calcWindow.style.visibility = "visible";
            activeWindow = "calculator"
            answerMathField.focus();
        }
    }
    else if (event.key == "`") {
        clearAll();
    }
    else if (event.key == "ArrowUp" && event.ctrlKey == true) {
        for (let i = 0; i < resultContChildren.length; i++) {
            resultContChildren[i].style.border = "none";
        }
        if (selectedInputChild < resultContChildren.length) {
            selectedInputChild++;
        }
        resultContChildren[(recentInputs.length * 2) - selectedInputChild].style.border = "1px solid black";
    }

    //TODO: Readd border top to displayed inputs after border style wipe. Actually allow enter to paste hovered input.

    else if (event.key == "ArrowDown" && event.ctrlKey == true) {
        for (let i = 0; i < resultContChildren.length; i++) {
            resultContChildren[i].style.border = "none";
        }
        if (selectedInputChild > 1) {
            selectedInputChild--;
            resultContChildren[(recentInputs.length * 2) - selectedInputChild].style.border = "1px solid black";
        }
        else if (selectedInputChild == 1) {
            for (let i = 0; i < resultContChildren.length; i++) {
                resultContChildren[i].style.border = "none";
            }
            selectedInputChild = 0;
            answerMathField.focus();
        }

    }
    else if (event.key == "ArrowDown" && event.altKey == true) {
        answerMathField.select();
        answerMathField.keystroke("Backspace");
    }
    else if (altEvents.includes(event.key) && event.altKey == true) {
        if (event.key == "p") {
            answerMathField.cmd('\\pi');
        }
        else if (event.key == "r") {
            answerMathField.cmd('\\sqrt');
        }
    }
    else if (inputVisible == true && event.altKey == true && event.key == "s") {
        inputVisible = false;
        inputWindow.style.display = "none";
        graphAll();
    }
    else if (inputVisible == false && event.altKey == true && event.key == "s") {
        inputVisible = true;
        inputWindow.style.display = "grid";
        window[latestFunctionEdited].focus();
    }
    else if (event.key == "ArrowUp" && event.altKey == true) {
        answerMathField.write(latestSubmittedInput);
    }
}




