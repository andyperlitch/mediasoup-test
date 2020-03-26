import { Router, WebRtcTransport } from 'mediasoup/lib/types'

export interface IPartyConnection {
  partyId: string
  audioSendTransport: WebRtcTransport
  videoSendTransport: WebRtcTransport
}

export interface IParty {
  id: string
  router: Router
}

export interface IPartyManager {
  createParty: () => Promise<IParty>
  joinParty: (id: string) => Promise<IPartyConnection>
}
