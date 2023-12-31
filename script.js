function annotate() {
  var x = document.getElementById("drawing-area");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  var y = document.getElementById("paint-tools");
  if (y.style.display === "none") {
    y.style.display = "block";
  } else {
    y.style.display = "none";
	document.getElementById("viewport").focus();
  }
}

annotate();

document.getElementById("viewport").focus();

function virtualR() {
  var newSrc = "https://realandreif.github.io/webstuff/xr/index.html";
  document.getElementById("viewport").src = newSrc;
  document.getElementById("viewport").focus();
}

function augmentedR() {
  var newSrc = "https://realandreif.github.io/webstuff/xr/index.html";
  document.getElementById("viewport").src = newSrc;
  document.getElementById("viewport").focus();
}

function pointCloud() {
  var newSrc = "https://realandreif.github.io/webstuff/webviewer/index.html";
  document.getElementById("viewport").src = newSrc;
  document.getElementById("viewport").focus();
}



// =============
// == Globals ==
// =============
const canvas = document.getElementById("drawing-area");
const canvasContext = canvas.getContext("2d");
const clearButton = document.getElementById("clear-button");
const state = {
  mousedown: false
};

// ===================
// == Configuration ==
// ===================
const lineWidth = 20;
const halfLineWidth = lineWidth / 2;
const fillStyle = "#333";
strokeStyle = "#333";
const shadowColor = "#333";
const shadowBlur = lineWidth / 4;

// =====================
// == Event Listeners ==
// =====================
canvas.addEventListener("mousedown", handleWritingStart);
canvas.addEventListener("mousemove", handleWritingInProgress);
canvas.addEventListener("mouseup", handleDrawingEnd);
canvas.addEventListener("mouseout", handleDrawingEnd);

canvas.addEventListener("touchstart", handleWritingStart);
canvas.addEventListener("touchmove", handleWritingInProgress);
canvas.addEventListener("touchend", handleDrawingEnd);

clearButton.addEventListener("click", handleClearButtonClick);

// ====================
// == Event Handlers ==
// ====================
function handleWritingStart(event) {
  event.preventDefault();

  const mousePos = getMosuePositionOnCanvas(event);

  canvasContext.beginPath();

  canvasContext.moveTo(mousePos.x, mousePos.y);

  canvasContext.lineWidth = lineWidth;
  canvasContext.strokeStyle = strokeStyle;
  canvasContext.shadowColor = null;
  canvasContext.shadowBlur = null;

  canvasContext.fill();

  state.mousedown = true;
}

function handleWritingInProgress(event) {
  event.preventDefault();

  if (state.mousedown) {
    const mousePos = getMosuePositionOnCanvas(event);

    canvasContext.lineTo(mousePos.x, mousePos.y);
    canvasContext.stroke();
  }
}

function handleDrawingEnd(event) {
  event.preventDefault();

  if (state.mousedown) {
    canvasContext.shadowColor = shadowColor;
    canvasContext.shadowBlur = shadowBlur;

    canvasContext.stroke();
  }

  state.mousedown = false;
}

function handleClearButtonClick(event) {
  event.preventDefault();

  clearCanvas();
}

// ======================
// == Helper Functions ==
// ======================
function getMosuePositionOnCanvas(event) {
  const clientX = event.clientX || event.touches[0].clientX;
  const clientY = event.clientY || event.touches[0].clientY;
  const {
    offsetLeft,
    offsetTop
  } = event.target;
  const canvasX = clientX - offsetLeft;
  const canvasY = clientY - offsetTop;

  return {
    x: canvasX,
    y: canvasY
  };
}

function clearCanvas() {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
}

function bluePen() {
  strokeStyle = "#DFE05C";
}
