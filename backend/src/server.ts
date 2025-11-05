import http from 'node:http'

import { env } from './config/env'
import { createApp } from './app'

const app = createApp()

const server = http.createServer(app)

server.listen(env.port, () => {
  console.log(`API listening on http://127.0.0.1:${env.port}`)
})
