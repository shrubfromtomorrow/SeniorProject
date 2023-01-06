

const functionLabels = document.getElementsByClassName('functionLabel');

for (let i = 0; i < 6; i++) {
  MQ.StaticMath(functionLabels[i]);
}

var MQ = MathQuill.getInterface(2);
var answerSpan1 = document.getElementById('answer1');
var answerMathField1 = MQ.MathField(answerSpan1, {
  handlers: {
    edit: function () {
      // checkAnswer(enteredMath);
    },
    enter: graphAll
  }
});

var answerSpan2 = document.getElementById('answer2');
var answerMathField2 = MQ.MathField(answerSpan2, {
  handlers: {
    edit: function () {
      // checkAnswer(enteredMath);
    },
    enter: graphAll
  }
});

var answerSpan3 = document.getElementById('answer3');
var answerMathField3 = MQ.MathField(answerSpan3, {
  handlers: {
    edit: function () {
      // checkAnswer(enteredMath);
    },
    enter: graphAll
  }
});

var answerSpan4 = document.getElementById('answer4');
var answerMathField4 = MQ.MathField(answerSpan4, {
  handlers: {
    edit: function () {
      // checkAnswer(enteredMath);
    },
    enter: graphAll
  }
});

var answerSpan5 = document.getElementById('answer5');
var answerMathField5 = MQ.MathField(answerSpan5, {
  handlers: {
    edit: function () {
      // checkAnswer(enteredMath);
    },
    enter: graphAll
  }
});

var answerSpan6 = document.getElementById('answer6');
var answerMathField6 = MQ.MathField(answerSpan6, {
  handlers: {
    edit: function () {
      // checkAnswer(enteredMath);
    },
    enter: graphAll
  }
});

const submitButton = document.getElementsByClassName("submitCont")[0];

submitButton.addEventListener("click", function () {
  inputVisible = false;
  inputWindow.style.display = "none";
  graphAll();
});

const inputWindow = document.getElementsByClassName("functionInput")[0];
let inputVisible = false;

document.onkeyup = function (event) {
  if (event.key == "`") {
    window.location.replace("index.html");
  }
  else if (inputVisible == true && event.altKey == true && event.key == "s") {
    inputVisible = false;
    inputWindow.style.display = "none";
    graphAll();
  }
  else if (inputVisible == false && event.altKey == true && event.key == "s") {
    inputVisible = true;
    inputWindow.style.display = "grid";
  }
}


function checkEmpty(inputField, inputNum) {
  latestGraphInput = inputField.latex();
  if (latestGraphInput == "") {
    return;
  }
  else {
    if (latestFunctions[inputNum] == latestGraphInput) {
      console.log("juan");
      return;
    }
    else {
      drawGraph(latestGraphInput.toString(), zoomValue);
    }
    latestFunctions[inputNum] = latestGraphInput;
  }
}

let latestFunctions = {
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
  6: "",
}

function graphAll() {
  inputVisible = false;
  inputWindow.style.display = "none";
  checkEmpty(answerMathField1, 1)
  checkEmpty(answerMathField2, 2)
  checkEmpty(answerMathField3, 3)
  checkEmpty(answerMathField4, 4)
  checkEmpty(answerMathField5, 5)
  checkEmpty(answerMathField6, 6)
}