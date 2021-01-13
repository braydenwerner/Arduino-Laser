const five = require('johnny-five')
const keypress = require('keypress')

const io = require('socket.io')(3000)

const {
  handleMouseCommand,
  handleVoiceCommand,
  handleKeyPressCommand
} = require('./inputHandlers')

keypress(process.stdin)

const board = new five.Board({
  port: 'COM3'
})

process.stdin.resume()
process.stdin.setEncoding('utf8')

board.on('ready', () => {
  console.log('board ready')

  const servoHorizontal = new five.Servo.Continuous(10)
  const servoVertical = new five.Servo.Continuous(11)

  servoHorizontal.to(0)
  servoVertical.to(0)

  io.on('connection', (socket) => {
    console.log('connection')

    socket.on('/mouseCommand', (mouseCord) => {
      const { angleH, angleV } = handleMouseCommand(mouseCord)
      servoHorizontal.to(angleH)
      servoVertical.to(angleV)
    })

    socket.on('/voiceCommand', (phrase) => {
      const { angleH, angleV } = handleVoiceCommand(phrase)
      servoHorizontal.to(angleH)
      servoVertical.to(angleV)
    })
  })

  process.stdin.on('keypress', (key) => {
    const { angleH, angleV } = handleKeyPressCommand(key)
    servoHorizontal.to(angleH)
    servoVertical.to(angleV)
  })
})
