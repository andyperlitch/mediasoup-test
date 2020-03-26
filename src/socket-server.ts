import { Server } from 'http'
import socketio from 'socket.io'

export function initSocketServer(app: Server) {
  const io = socketio(app)
  io.on('connection', socket => {
    console.log('a user connected')

    socket.on('mymessage', msg => {
      console.log(typeof msg)
      console.log(msg)
    })

    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  })
}
