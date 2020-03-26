import { createWorker } from 'mediasoup'
import { Worker } from 'mediasoup/lib/types'

let worker

async function initPartyManager() {
  worker = await createWorker()

  const mediaCodecs = [
    {
      kind: 'audio',
      mimeType: 'audio/opus',
      clockRate: 48000,
      channels: 2,
    },
    {
      kind: 'video',
      mimeType: 'video/H264',
      clockRate: 90000,
      parameters: {
        'packetization-mode': 1,
        'profile-level-id': '42e01f',
        'level-asymmetry-allowed': 1,
      },
    },
  ]

  const router = worker.createRouter({
    mediaCodecs: {},
  })
}
