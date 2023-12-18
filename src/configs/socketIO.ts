import { io } from 'socket.io-client'
let socket = io('http://localhost', {
  path: '/chat/socket.io',
  reconnectionDelayMax: 10000,
})
console.log('socket', socket)
export { socket }
