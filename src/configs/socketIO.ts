import { io } from 'socket.io-client'
import configs from './configs'
let socket = io(configs.BACKEND_URL, {
  path: '/chat/socket.io',
  reconnectionDelayMax: 10000,
})
console.log('socket', socket)

const notiSocket = io(configs.BACKEND_URL, {
  path: '/notifications/socket.io',
  reconnectionDelayMax: 10000,
})

export { socket, notiSocket }
