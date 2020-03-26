import { initApp } from './app'
import { createServer } from 'http'
import { initSocketServer } from './socket-server'

const port = process.env.PORT || 8443
const app = createServer(initApp())
initSocketServer(app)
app.listen(port, () => {
  console.info(`mediasoup-test server listening at http://localhost:${port}`)
})
