console.log("Switch windows with alt+j, show input window with alt+s");


const canvas = document.getElementsByClassName('canvas')[0];
const canvasCont = document.getElementsByClassName("canvasCont")[0];
let latestGraphInput = "";
let zoomValue = 20.0;


let ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

// Set display size (css pixels).
let sizeX = canvasCont.getBoundingClientRect().width;
let sizeY = canvasCont.getBoundingClientRect().height;

// let sizeX = window.innerWidth;
// let sizeY = window.innerHeight;


canvas.style.width = sizeX + "px";
canvas.style.height = sizeY + "px";
// Set actual size in memory (scaled to account for extra pixel density).
let scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
canvas.width = sizeX * scale;
canvas.height = sizeY * scale;
// Normalize coordinate system to use css pixels.
ctx.scale(scale, scale);

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
      ctx.fillStyle = "#eff1f5";
      ctx.fillRect(((x) * (sizeX / zoom)) + (sizeX / 2) - 8, sizeY / 2 + 1, 15, 15);
      ctx.fillStyle = "#4c4f69";
      ctx.fillText(x.toString(), ((x) * (sizeX / zoom)) + (sizeX / 2), sizeY / 2 + 13);
    }
  }
}

function drawGrid(segNum) {
  for (let x = -(segNum / 2); x <= (segNum / 2); x++) {
    if (x % (segNum / zoomValue) == 0) {
      ctx.strokeStyle = "black";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo((-1 * (x) * (sizeX / segNum)) + (sizeX / 2), 0);
      ctx.lineTo((-1 * (x) * (sizeX / segNum)) + (sizeX / 2), sizeY);
      ctx.stroke();
    }
  }
  for (let y = -(segNum / 2); y < (segNum / 2); y++) {
    if (y % (segNum / zoomValue) == 0) {
      ctx.strokeStyle = "black";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, (-1 * (y) * (sizeX / segNum)) + (sizeY / 2));
      ctx.lineTo(sizeX, (-1 * (y) * (sizeX / segNum)) + (sizeY / 2));
      ctx.stroke();
    }
  }
}

let colors = ["#1e66f5", "#d20f39", "#ea76cb", "#40a02b", "#04a5e5"];
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
  colors = colors.filter(function (e) { return e !== ctx.strokeStyle });

  ctx.lineWidth = 2;
  let outOfRange = false;
  for (let x = -(zoom / 2); x < (zoom / 2); x += (zoom / canvas.width)) {
    if (formula.toString().includes("\\pi")) {
      formula = formula.replaceAll("\\pi", "PI");
    }
    // if (formula.toString().includes("e")) {
    //   formula = formula.replaceAll("e", "E");
    // }
    fn = evaluatex(formula);
    yValue = fn({ x });
    yValue = yValue.toFixed(10);
    yValue = parseFloat(yValue);

    if (yValue > zoomValue || yValue < -1.0 * zoomValue) {
      outOfRange = true;
    }
    else {
      if (outOfRange == true) {
        prevPoint = [(sizeX / 2) + (x * (sizeX / zoom)), (sizeY / 2) - (yValue * (sizeX / zoom))];
      }
      else {

        ctx.beginPath();
        ctx.moveTo(prevPoint[0], prevPoint[1]);
        ctx.lineTo((sizeX / 2) + (x * (sizeX / zoom)), (sizeY / 2) - (yValue * (sizeX / zoom)));
        // ctx.fillRect((sizeX / 2) + (x * (sizeX / zoom)), (sizeY / 2) - (yValue * (sizeX / zoom)), 1, 1);
        ctx.stroke();
      }
      outOfRange = false;
      prevPoint = [(sizeX / 2) + (x * (sizeX / zoom)), (sizeY / 2) - (yValue * (sizeX / zoom))];
    }
  }
}

function whiteGraph(formula, zoom) {
  let prevPoint = [];
  let yValue;
  ctx.strokeStyle = "#ffffff";

  ctx.lineWidth = 5;
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
  console.log(latestGraphInput);
  drawGrid(zoomValue);
  drawAxes(zoomValue);
  drawNums(zoomValue);
  drawGraph(latestGraphInput.toString(), zoomValue);
}

function zoomIn() {
  zoomValue -= 40;
  ctx.clearRect(0, 0, sizeX, sizeY);
  drawGrid(zoomValue);
  drawAxes(zoomValue);
  drawNums(zoomValue);
  drawGraph(latestGraphInput.toString(), zoomValue);
}

function clearAll() {
  // for (let i = 1; i < 7; i++) {
  //   if (latestFunctionEdits[i] == "") {
  //     continue;
  //   }
  //   else {
  //     console.log(latestFunctionEdits[i]);
  //     whiteGraph(latestFunctionEdits[i].toString(), 20);
  //   }
  // }
  ctx.clearRect(0, 0, sizeX, sizeY);
  drawGrid(zoomValue);
  drawAxes(zoomValue);
  drawNums(zoomValue);
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
