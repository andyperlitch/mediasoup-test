import { createWorker } from 'mediasoup'
import { Worker, RtpCodecCapability, Router } from 'mediasoup/lib/types'

interface IParty {
  router: Router
}

interface IPartyManager {
  createParty: () => Promise<IParty>
}

let worker: Worker

export async function initPartyManager(): Promise<IPartyManager> {
  // create the worker (C++ process)
  worker = await createWorker()

  // return manager interface
  return {
    createParty,
  }
}

async function createParty(): Promise<IParty> {
  // init the mediasoup router
  const router = await worker.createRouter({
    mediaCodecs: getMediaCodecs(),
  })

  return {
    router,
  }
}

function getMediaCodecs(): RtpCodecCapability[] {
  return [
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
}
