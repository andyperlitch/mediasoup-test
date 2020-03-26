import { createWorker } from 'mediasoup'
import { Worker } from 'mediasoup/lib/types'

let worker: Worker

async function initPartyManager() {
  worker = await createWorker()
  const router = worker.createRouter({
    mediaCodecs: {},
  })
}
