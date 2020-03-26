import { randomBytes } from 'crypto'
import { createWorker } from 'mediasoup'
import { Worker, RtpCodecCapability } from 'mediasoup/lib/types'
import { IPartyManager, IParty, IPartyConnection } from 'party'

let worker: Worker
let parties: { [id: string]: IParty } = {}

function newPartyId(): string {
  return randomBytes(16).toString('hex')
}

export async function initPartyManager(): Promise<IPartyManager> {
  // create the worker (C++ process)
  worker = await createWorker()

  // return manager interface
  return {
    createParty,
    joinParty,
  }
}

async function createParty(): Promise<IParty> {
  // init the mediasoup router
  const router = await worker.createRouter({
    mediaCodecs: getMediaCodecs(),
  })

  // create a unique party id
  const id = newPartyId()

  // add the party to the internal hash
  parties[id] = {
    id,
    router,
  }

  return parties[id]
}

async function joinParty(partyId: string): Promise<IPartyConnection> {
  const { router } = parties[partyId]

  // create transports for audio and video
  const transport = await router.createWebRtcTransport({
    listenIps: [
      {
        ip: '127.0.0.1',
      },
    ],
    enableUdp: true,
    enableTcp: true,
    preferUdp: true,
    appData: {
      // user info?
      partyId,
    },
  })

  return {
    partyId,
    audioSendTransport: transport,
    videoSendTransport: transport,
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
