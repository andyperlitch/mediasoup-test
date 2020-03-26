import { Server } from 'http'
import socketio from 'socket.io'

export function initSocketServer(app: Server) {
  const io = socketio(app)
  io.on('connection', socket => {
    console.log('a user connected')
  })
}
