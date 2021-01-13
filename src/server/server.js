const five = require('johnny-five')
const keypress = require('keypress')

const io = require('socket.io')(3000)

const {
  handleMouseCommand,
  handleVoiceCommand,
  handleKeyPressCommand
} = require('./inputHandlers')

keypress(process.stdin)

var board = new five.Board({
  port: 'Com3'
})

board.on('ready', () => {
  io.on('connection', (socket) => {
    console.log('connection')

    socket.on('/mouseCommand', (mouseCord) => {
      handleMouseCommand(mouseCord)
    })

    socket.on('/voiceCommand', (phrase) => {
      handleVoiceCommand(phrase)
    })
  })

  process.stdin.on('keypress', (key) => {
    handleKeyPressCommand(key)
  })
})
