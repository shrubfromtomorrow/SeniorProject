console.log("Switch windows with alt+j, show input window with alt+s");


const canvas = document.getElementsByClassName('canvas')[0];
const canvasCont = document.getElementsByClassName("canvasCont")[0];
let latestInput = "";
let zoomValue = 20;


let ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

// Set display size (css pixels).
let sizeX = canvasCont.getBoundingClientRect().width;
let sizeY = canvasCont.getBoundingClientRect().height;

console.log(sizeX);
console.log(sizeY);

canvas.style.width = sizeX + "px";
canvas.style.height = sizeY + "px";
// Set actual size in memory (scaled to account for extra pixel density).
let scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
canvas.width = sizeX * scale;
canvas.height = sizeY * scale;
// Normalize coordinate system to use css pixels.
// ctx.scale(scale, scale);

function drawAxes() {
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(sizeX / 2, 0);
  ctx.lineTo(sizeX / 2, sizeY);
  ctx.moveTo(0, sizeY / 2);
  ctx.lineTo(sizeX, sizeY / 2);
  ctx.stroke();
}

function drawNums(zoom) {
  ctx.font = "15px Arial";
  ctx.textAlign = "center";

  for (let x = -(zoom / 2); x <= (zoom / 2); x++) {
    if (x % (zoom / 20) == 0) {
      ctx.fillStyle = "white";
      ctx.fillRect(((x) * (sizeX / zoom)) + (sizeX / 2) - 8, sizeY / 2 + 1, 15, 15);
      ctx.fillStyle = "black";
      ctx.fillText(x.toString(), ((x) * (sizeX / zoom)) + (sizeX / 2), sizeY / 2 + 13);
    }
  }
}

function drawGrid(segNum) {
  for (let x = -(segNum / 2); x <= (segNum / 2); x++) {
    if (x % (segNum / 20) == 0) {
      ctx.strokeStyle = "black";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo((-1 * (x) * (sizeX / segNum)) + (sizeX / 2), 0);
      ctx.lineTo((-1 * (x) * (sizeX / segNum)) + (sizeX / 2), sizeY);
      ctx.stroke();
    }
  }
  for (let y = -(segNum / 2); y < (segNum / 2); y++) {
    if (y % (segNum / 20) == 0) {
      ctx.strokeStyle = "black";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, (-1 * (y) * (sizeX / segNum)) + (sizeY / 2));
      ctx.lineTo(sizeX, (-1 * (y) * (sizeX / segNum)) + (sizeY / 2));
      ctx.stroke();
    }
  }
}

let colors = ["#ff0000", "#0000ff", "#008000", "#800080"];
let poppedColors = [];

function drawGraph(formula, zoom) {
  let prevPoint = [];
  let yValue;
  if (colors.length == 0) {
    for (let x = 0; x < poppedColors.length; x++) {
      colors.push(poppedColors[x]);
    }
    poppedColors.splice(0, poppedColors.length);
  }
  ctx.strokeStyle = colors[Math.floor(Math.random() * colors.length)];
  poppedColors.push(ctx.strokeStyle);
  colors = colors.filter(function (e) { return e !== ctx.strokeStyle })

  ctx.lineWidth = 2;
  for (let x = -(zoom / 2); x < (zoom / 2); x += (zoom / 5000)) {
    fn = evaluatex(formula);
    yValue = fn({ x });
    yValue = yValue.toFixed(10);
    yValue = parseFloat(yValue);
    ctx.beginPath();
    ctx.moveTo(prevPoint[0], prevPoint[1]);
    ctx.lineTo((sizeX / 2) + (x * (sizeX / zoom)), (sizeY / 2) - (yValue * (sizeX / zoom)))
    // ctx.fillRect((sizeX / 2) + (x * (sizeX / zoom)), (sizeY / 2) - (yValue * (sizeX / zoom)), 1, 1);
    ctx.stroke();
    prevPoint = [(sizeX / 2) + (x * (sizeX / zoom)), (sizeY / 2) - (yValue * (sizeX / zoom))];
  }
}

function zoomOut() {
  zoomValue += 40;
  ctx.clearRect(0, 0, sizeX, sizeY);
  console.log(latestInput);
  drawGrid(zoomValue);
  drawAxes(zoomValue);
  drawNums(zoomValue);
  drawGraph(latestInput.toString(), zoomValue);
}

function zoomIn() {
  zoomValue -= 40;
  ctx.clearRect(0, 0, sizeX, sizeY);
  drawGrid(zoomValue);
  drawAxes(zoomValue);
  drawNums(zoomValue);
  drawGraph(latestInput.toString(), zoomValue);
}

const zoomOutButton = document.getElementById("zoomOut");
const zoomInButton = document.getElementById("zoomIn");

// zoomOutButton.addEventListener("click", function () {
//   zoomOut();
// });

// zoomInButton.addEventListener("click", function () {
//   zoomIn();
// });


drawGrid(zoomValue);
drawAxes(zoomValue);
drawNums(zoomValue);

const ipcRenderer = window.ipcRenderer;


document.onkeydown = function (event) {
  if (event.key == "r" && event.ctrlKey == true) {
    return;
  }
  else if (event.key == "j" && event.altKey == true) {
    window.api.switch();
    // window.location.replace("graph.html");
  }
}
