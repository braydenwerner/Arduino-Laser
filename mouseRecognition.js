const socket = io("http://localhost:3000");
const cords = document.getElementById("cords");
const getMousePos = (canvas, e) => {
  var rect = canvas.getBoundingClientRect();
  return {
    x: parseInt(e.clientX - rect.left),
    y: parseInt(e.clientY - rect.top),
  };
};

//servo goes from 0 to 160
//left is 160, right is 0
//scale everything down to max of 160
const canvas = document.getElementById("canvas");
canvas.addEventListener("mousemove", (e) => {
  var mousePos = getMousePos(canvas, e);

  let displayX = parseInt(mousePos.x * (160 / 800));
  let displayY = parseInt(160 - (mousePos.y * (160 / 800)));
  cords.innerHTML = ("(" + displayX + "," + displayY + ")");

  mousePos.x = (800 - mousePos.x) * (160 / 800);
  if (mousePos.x < 0) mousePos.x = 0;

  mousePos.y = (800 - mousePos.y) * (160 / 800);
  if (mousePos.y < 0) mousePos.y = 0;

  sendData(mousePos)
});

async function sendData(mousePos) {
  socket.emit('/mouseCommand',mousePos);
}
