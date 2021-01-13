let angleH = 0
let angleV = 0

exports.handleMouseCommand = (mouseCord) => {
  angleH = parseInt(mouseCord.x)
  angleV = parseInt(mouseCord.y)

  return handleServo(angleH, angleV)
}

exports.handleVoiceCommand = (phrase) => {
  console.log('reached voice command')
  let degree = parseInt(phrase.replace(/\D/g, ''))
  degree = degree > 10 ? degree : 10

  if (phrase.indexOf('left') >= 0) angleH += degree
  if (phrase.indexOf('right') >= 0 || phrase.indexOf('write') >= 0)
    angleH -= degree
  if (phrase.indexOf('up') >= 0) angleV += degree
  if (phrase.indexOf('down') >= 0) angleV -= degree

  return handleServo(angleH, angleV)
}

exports.handleKeyPressCommand = (key) => {
  if (!key) return

  if (key.name === 'left') angleH += 5
  if (key.name === 'right') angleH -= 5
  if (key.name === 'up') angleV += 5
  if (key.name === 'down') angleV -= 5

  return handleServo(angleH, angleV)
}

const handleServo = (angleH, angleV) => {
  if (angleH > 160) angleH = 160
  if (angleV > 160) angleV = 160
  if (angleH < 0) angleH = 0
  if (angleV < 0) angleV = 0

  return { angleH, angleV }
}
