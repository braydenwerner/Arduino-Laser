const socket = io('http://localhost:3000')

const btn = document.getElementById('talk')

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()

recognition.onstart = () => {
  console.log('voice activated')
}

recognition.onresult = (event) => {
  const phrase = event.results[0][0].transcript
  header.appendChild(text)
  sendData(phrase)
}

async function sendData(phrase) {
  socket.emit('/voiceCommand', phrase)
}

btn.addEventListener('click', () => {
  recognition.start()
})
