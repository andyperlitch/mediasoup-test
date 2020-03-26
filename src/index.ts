import { initApp } from './app'
import { createServer } from 'http'
import { initSocketServer } from './socket-server'

async function main() {
  const port = process.env.PORT || 8443
  const app = createServer(await initApp())
  initSocketServer(app)
  app.listen(port, () => {
    console.info(`mediasoup-test server listening at http://localhost:${port}`)
  })
}

main()
