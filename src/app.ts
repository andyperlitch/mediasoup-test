import express from 'express'

function initApp() {
  const app = express()
  app.disable('X-Powered-By')

  return app
}
