

const functionLabels = document.getElementsByClassName('functionLabel');

let latestFunctionEdited = "answerMathField1";



for (let i = 0; i < 6; i++) {
  MQ.StaticMath(functionLabels[i]);
}

var MQ = MathQuill.getInterface(2);
var answerSpan1 = document.getElementById('answer1');
var answerMathField1 = MQ.MathField(answerSpan1, {
  handlers: {
    edit: function () {
      latestFunctionEdited = "answerMathField1";
      // checkAnswer(enteredMath);
    },
    enter: graphAll
  }
});

var answerSpan2 = document.getElementById('answer2');
var answerMathField2 = MQ.MathField(answerSpan2, {
  handlers: {
    edit: function () {
      latestFunctionEdited = "answerMathField2";
      // checkAnswer(enteredMath);
    },
    enter: graphAll
  }
});

var answerSpan3 = document.getElementById('answer3');
var answerMathField3 = MQ.MathField(answerSpan3, {
  handlers: {
    edit: function () {
      latestFunctionEdited = "answerMathField3";
      // checkAnswer(enteredMath);
    },
    enter: graphAll
  }
});

var answerSpan4 = document.getElementById('answer4');
var answerMathField4 = MQ.MathField(answerSpan4, {
  handlers: {
    edit: function () {
      latestFunctionEdited = "answerMathField4";
      // checkAnswer(enteredMath);
    },
    enter: graphAll
  }
});

var answerSpan5 = document.getElementById('answer5');
var answerMathField5 = MQ.MathField(answerSpan5, {
  handlers: {
    edit: function () {
      latestFunctionEdited = "answerMathField5";
      // checkAnswer(enteredMath);
    },
    enter: graphAll
  }
});

var answerSpan6 = document.getElementById('answer6');
var answerMathField6 = MQ.MathField(answerSpan6, {
  handlers: {
    edit: function () {
      latestFunctionEdited = "answerMathField6";
      // checkAnswer(enteredMath);
    },
    enter: graphAll
  }
});

let answerSpan1TextArea = answerSpan1.children[0].children[0];

const inputWindow = document.getElementsByClassName("functionInput")[0];
let inputVisible = false;


function checkEmpty(inputField, inputNum) {
  console.log(inputField);
  if (inputField.toString().includes("\\e")) {
    inputField = inputField.replaceAll("\\e", "E");
  }
  latestGraphInput = inputField.latex();
  if (latestGraphInput == "") {
    return;
  }
  else {
    console.log(latestGraphInput);

    if (latestFunctionEdits[inputNum] == latestGraphInput) {
      return;
    }
    else {
      drawGraph(latestGraphInput.toString(), zoomValue);
    }
    latestFunctionEdits[inputNum] = latestGraphInput;
  }
}

let latestFunctionEdits = {
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