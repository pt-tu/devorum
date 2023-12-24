import { io } from 'socket.io-client'
let socket = io('http://localhost', {
  path: '/chat/socket.io',
  reconnectionDelayMax: 10000,
})
console.log('socket', socket)

const notiSocket = io('http://localhost', {
  path: '/notifications/socket.io',
  reconnectionDelayMax: 10000,
})

export { socket, notiSocket }
