var five = require("johnny-five");
var keypress = require("keypress");

const io = require("socket.io")(3000);

let angleH = 0;
let angleV = 0;

keypress(process.stdin);

var board = new five.Board({
  port: "Com3",
});

board.on("ready", function () {
  var servoHorizontal = new five.Servo.Continuous(10);
  var servoVertical = new five.Servo.Continuous(11);

  servoHorizontal.to(0);
  servoVertical.to(0);

  process.stdin.resume();
  process.stdin.setEncoding("utf8");

  io.on("connection", (socket) => {
    console.log('connection');
    socket.on("/mouseCommand", (mouseCord) => {
      let x = parseInt(mouseCord.x);
      let y = parseInt(mouseCord.y);

      angleH = x;
      angleV = y;

      handleServo(servoHorizontal,servoVertical,angleH,angleV);
    });

    socket.on("/voiceCommand", (phrase) => {
      console.log('reached voice command')
      let degree = parseInt(phrase.replace(/\D/g, ""));
      degree = degree > 10 ? degree : 10;

      if (phrase.indexOf("left") >= 0) angleH += degree;
      if (phrase.indexOf("right") >= 0 || phrase.indexOf("write") >= 0)
        angleH -= degree;
      if (phrase.indexOf("up") >= 0) angleV += degree;
      if (phrase.indexOf("down") >= 0) angleV -= degree;

      handleServo(servoHorizontal, servoVertical, angleH, angleV);
    });
  });

  process.stdin.on("keypress", function (ch, key) {
    if (!key) return;

    if (key.name === "left") angleH += 5;
    if (key.name === "right") angleH -= 5;
    if (key.name === "up") angleV += 5;
    if (key.name === "down") angleV -= 5;

    handleServo(servoHorizontal, servoVertical, angleH, angleV);
  });
});

const handleServo = (servoHorizontal, servoVertical, aH, aV) => {
  if (aH > 160) angleH = 160;
  if (aH < 0) angleH = 0;
  if (aV > 160) angleV = 160;
  if (aV < 0) angleV = 0;

  servoHorizontal.to(angleH);
  servoVertical.to(angleV);

  console.log("Horizontal: " + angleH);
  console.log("Vertical: " + angleV);
};
