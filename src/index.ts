import { initApp } from './app'

const port = process.env.PORT || 8443
const app = initApp()
app.listen(port, () => {
  console.info(`mediasoup-test server listening at http://localhost:${port}`)
})
