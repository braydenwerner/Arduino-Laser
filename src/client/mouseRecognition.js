const socket = io('http://localhost:3000')
const cords = document.getElementById('cords')

const canvas = document.getElementById('canvas')

const getMousePos = (canvas, e) => {
  var rect = canvas.getBoundingClientRect()
  return {
    x: parseInt(e.clientX - rect.left),
    y: parseInt(e.clientY - rect.top)
  }
}

//  servo goes from 0 to 160 degrees
canvas.addEventListener('mousemove', (e) => {
  let mousePos = getMousePos(canvas, e)

  const displayX = parseInt(mousePos.x * (160 / 800))
  const displayY = parseInt(160 - mousePos.y * (160 / 800))
  cords.innerText = `(${displayX},${displayY}')`

  mousePos.x = (800 - mousePos.x) * (160 / 800)
  if (mousePos.x < 0) mousePos.x = 0

  mousePos.y = (800 - mousePos.y) * (160 / 800)
  if (mousePos.y < 0) mousePos.y = 0

  sendData(mousePos)
})

async function sendData(mousePos) {
  socket.emit('/mouseCommand', mousePos)
}
