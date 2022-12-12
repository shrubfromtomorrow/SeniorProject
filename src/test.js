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
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();
}

drawAxes();