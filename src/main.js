
console.log("Switch windows with alt+j. Sqrt with alt+r, pi with alt+p. alt+up gives most recent input in regular calc. alt+s shows the graph input window. ` clears the window. alt+down clears the regular calc input.");

let replacements = {
    "\\pi": "PI",
}

let activeElement = answerMathField;

//               pi   sqrt sin  cos  tan  beg  end
let altEvents = ["p", "r", "i", "o", "l", "b", "g"];
let recentResults = [];

let recentInputs = [];
let selectedInputChild = 0;

let latestInput = "";
let latestSubmittedInput = "";
let resultDisplays = document.getElementsByClassName("result");
let resultCont = document.getElementsByClassName("resultCont")[0];
let resultContChildren = resultCont.children;
let resultInputs = document.getElementsByClassName("resultInput");


let historyMode = false;


var MQ = MathQuill.getInterface(2);
var answerSpan = document.getElementById('answer');
var answerMathField = MQ.MathField(answerSpan, {
    handlers: {
        edit: function () {
            latestInput = answerMathField.latex(); // Get entered math in LaTeX format
        },
        enter: function () {
            if (historyMode) {
                answerMathField.select();
                answerMathField.keystroke("Backspace");
                if (resultContChildren[(recentInputs.length * 2) - selectedInputChild].className == "resultInput mq-math-mode") {
                    answerMathField.write(MQ.StaticMath(resultContChildren[(recentInputs.length * 2) - selectedInputChild]).latex());
                }
                else {
                    answerMathField.write(resultContChildren[(recentInputs.length * 2) - selectedInputChild].textContent);
                }
            }
            else {
                latestSubmittedInput = latestInput;
                if (latestInput.toString().includes("\\pi")) {
                    latestInput = latestInput.replaceAll("\\pi", " PI");
                }
                // Cannot replace every single e
                // if (latestInput.toString().includes("e")) {
                //     latestInput = latestInput.replaceAll("e", "E");
                // }
                console.log(latestInput);
                let fn = evaluatex(latestInput.toString());

                let result = +fn().toFixed(10);
                if (result == "Infinity") {
                    result = "Why do you to calculate big numbers?";
                }
                recentResults.push(result);
                recentInputs.push(latestSubmittedInput);
                resultCont.appendChild(document.createElement("div")).setAttribute("class", "result");
                resultCont.appendChild(document.createElement("div")).setAttribute("class", "resultInput");
                for (let i = 0; i < recentResults.length; i++) {
                    resultDisplays[i].textContent = recentResults[i];
                    resultInputs[i].textContent = recentInputs[i];

                    // LATEST SUBMITTED INPUTS
                    MQ.StaticMath(resultInputs[i]);
                }
                console.log(result);
                // answerMathField.select();
                // answerMathField.keystroke("Backspace");
            }
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
            activeWindow = "graph";
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
            resultContChildren[i].style.color = "black";
        }
        if (selectedInputChild < resultContChildren.length) {
            historyMode = true;
            selectedInputChild++;
        }
        resultContChildren[(recentInputs.length * 2) - selectedInputChild].style.color = "red";
    }

    //TODO: Readd border top to displayed inputs after border style wipe. Actually allow enter to paste hovered input.

    else if (event.key == "ArrowDown" && event.ctrlKey == true) {
        for (let i = 0; i < resultContChildren.length; i++) {
            resultContChildren[i].style.color = "black";
        }
        if (selectedInputChild > 1) {
            historyMode = true;
            selectedInputChild--;
            resultContChildren[(recentInputs.length * 2) - selectedInputChild].style.color = "red";
        }
        else if (selectedInputChild == 1) {
            for (let i = 0; i < resultContChildren.length; i++) {
                resultContChildren[i].style.color = "black";
            }
            selectedInputChild = 0;
            answerMathField.focus();
            historyMode = false;
        }

    }
    else if (event.key == "ArrowDown" && event.altKey == true) {
        answerMathField.select();
        answerMathField.keystroke("Backspace");
    }
    else if (altEvents.includes(event.key) && event.altKey == true) {
        switch(event.key) {
            case "p":
                if (activeWindow == "calculator") {
                    answerMathField.cmd('\\pi');
                }
                else if (activeWindow == "graph") {
                    window["answerMathField" + document.activeElement.parentElement.parentElement.id.slice(-1)].cmd('\\pi');
                }
                break;
            case "r":
                if (activeWindow == "calculator") {
                    answerMathField.cmd('\\sqrt');
                }
                else if (activeWindow == "graph") {
                    window["answerMathField" + document.activeElement.parentElement.parentElement.id.slice(-1)].cmd('\\sqrt');
                }
                break;
            case "i":
                if (activeWindow == "calculator") {
                    answerMathField.typedText('sin()');
                    answerMathField.keystroke("Left");
                }
                else if (activeWindow == "graph") {
                    window["answerMathField" + document.activeElement.parentElement.parentElement.id.slice(-1)].typedText('sin()');
                    window["answerMathField" + document.activeElement.parentElement.parentElement.id.slice(-1)].keystroke("Left");
                }
                break;
            case "o":
                if (activeWindow == "calculator") {
                    answerMathField.typedText('cos()');
                    answerMathField.keystroke("Left");
                }
                else if (activeWindow == "graph") {
                    window["answerMathField" + document.activeElement.parentElement.parentElement.id.slice(-1)].typedText('cos()');
                    window["answerMathField" + document.activeElement.parentElement.parentElement.id.slice(-1)].keystroke("Left");
                }
                break;
            case "l":
                if (activeWindow == "calculator") {
                    answerMathField.typedText('tan()');
                    answerMathField.keystroke("Left");
                }
                else if (activeWindow == "graph") {
                    window["answerMathField" + document.activeElement.parentElement.parentElement.id.slice(-1)].typedText('tan()');
                    window["answerMathField" + document.activeElement.parentElement.parentElement.id.slice(-1)].keystroke("Left");
                }
                break;
            case "b":
                if (activeWindow == "calculator") {
                    answerMathField.moveToLeftEnd();
                }
                else if (activeWindow == "graph") {
                    window["answerMathField" + document.activeElement.parentElement.parentElement.id.slice(-1)].moveToLeftEnd();
                }
                break;
            case "g":
                if (activeWindow == "calculator") {
                    answerMathField.moveToRightEnd();
                }
                else if (activeWindow == "graph") {
                    window["answerMathField" + document.activeElement.parentElement.parentElement.id.slice(-1)].moveToRightEnd();
                }
                break;
        }
    }
    else if (inputVisible == true && event.altKey == true && event.key == "s" && activeWindow != "calculator") {
        inputVisible = false;
        inputWindow.style.display = "none";
        graphAll();
    }
    else if (inputVisible == false && event.altKey == true && event.key == "s" && activeWindow != "calculator") {
        inputVisible = true;
        inputWindow.style.display = "grid";
        window[latestFunctionEdited].focus();
    }
    else if (event.key == "ArrowUp" && event.altKey == true) {
        answerMathField.write(latestSubmittedInput);
    }
}




