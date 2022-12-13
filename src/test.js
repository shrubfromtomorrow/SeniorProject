let latestInput = "";

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
      answerMathField.select();
      answerMathField.keystroke("Backspace");
    }
  }
});

const canvas = document.getElementsByClassName("canvas")[0];
const canvasCont = document.getElementsByClassName("canvasCont")[0];

const canvasW = canvasCont.getBoundingClientRect().width;
const canvasH = canvasCont.getBoundingClientRect().height;

// Box width
var bw = 400;
// Box height
var bh = 400;
// Padding
var ctx = canvas.getContext("2d");

ctx.canvas.width = canvasW;
ctx.canvas.height = canvasH;

function drawAxes() {
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();
}

function drawGrid() {
  let lineNumX = parseInt(canvas.width / 40);
  let lineNumY = lineNumX;


  for (let x = 0; x < canvas.width; x += lineNumX) {

    if (x == lineNumX * 20) {
      console.log(x);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    else {
      ctx.strokeStyle = "grey";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

  }

  for (let y = 0; y < canvas.height; y += lineNumY) {
    ctx.strokeStyle = "grey";
    ctx.lineWidth = 1;
    if (y == lineNumX * 20) {
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    else {
      ctx.strokeStyle = "grey";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }
}

function drawNums() {
  ctx.font = "10px Arial";
  ctx.filStyle = "Black";
  ctx.textAlign = "center";

  for (let x = -20; x < 20; x++) {
    if (x % 5 == 0) {
      ctx.fillText(x.toString(), (20 * canvas.width / 40) + x * (canvas.width / 40) + 4, (canvas.height / 2) + 10);
    }
  }
}

function drawGraph() {
  let yValue;
  for (let x = -4; x < 4; x += .01) {
    yValue = (x * x * x) - (x);
    yValue = yValue.toFixed(10);
    yValue = parseFloat(yValue);
    ctx.fillRect((canvas.width / 2 - 1.5) + (x * (canvas.width / 40)), (canvas.height / 2 - 1.5) - (yValue * (canvas.width / 40)), 2, 2);
  }
}

drawGrid();
// drawAxes();
drawNums();
drawGraph();