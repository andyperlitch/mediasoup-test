import { resolve } from 'path'
import express from 'express'

export function initApp() {
  const app = express()
  app.disable('X-Powered-By')

  app.use(express.static(resolve(__dirname, 'static')))

  return app
}
