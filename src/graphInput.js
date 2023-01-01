

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
  }
  else if (inputVisible == false && event.altKey == true && event.key == "s") {
    inputVisible = true;
    inputWindow.style.display = "flex";
  }
  else {
    console.log(event);
  }
}

function graphAll() {
  inputVisible = false;
  inputWindow.style.display = "none";
  latestGraphInput = answerMathField1.latex(); // Get entered math in LaTeX format
  drawGraph(latestGraphInput.toString(), zoomValue);
  latestGraphInput = answerMathField2.latex(); // Get entered math in LaTeX format
  drawGraph(latestGraphInput.toString(), zoomValue);
  latestGraphInput = answerMathField3.latex(); // Get entered math in LaTeX format
  drawGraph(latestGraphInput.toString(), zoomValue);
  latestGraphInput = answerMathField4.latex(); // Get entered math in LaTeX format
  drawGraph(latestGraphInput.toString(), zoomValue);
}