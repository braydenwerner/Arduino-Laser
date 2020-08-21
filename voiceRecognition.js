const socket = io("http://localhost:3000");
const btn = document.querySelector(".talk");
const content = document.querySelector(".content");

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = () => {
  console.log("voice activated");
};

recognition.onresult = (event) => {
  let header = document.createElement("h3");
  let phrase = event.results[0][0].transcript;
  let text = document.createTextNode(phrase);
  header.appendChild(text);
  content.appendChild(header);
  sendData(phrase);
};

async function sendData(phrase) {
  console.log('sending data');
  socket.emit('/voiceCommand', phrase);
}

btn.addEventListener("click", () => {
  recognition.start();
});