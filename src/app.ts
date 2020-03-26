import { resolve } from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import asyncHandler from 'express-async-handler'
import { initPartyManager } from './party-manager'
import { IParty, IPartyConnection } from 'party'
import { WebRtcTransport } from 'mediasoup/lib/types'

export async function initApp() {
  const partyMgr = await initPartyManager()

  const app = express()
  app.disable('X-Powered-By')
  app.use(bodyParser())

  app.post(
    '/parties',
    asyncHandler(async (req, res) => {
      const party = await partyMgr.createParty()
      res.json(partyToJson(party))
    })
  )

  app.post(
    '/parties/:partyId/join',
    asyncHandler(async (req, res) => {
      const { partyId } = req.params
      const partyConnection = await partyMgr.joinParty(partyId)
      res.json(partyConnectionToJson(partyConnection))
    })
  )

  app.use(express.static(resolve(__dirname, '../client/')))

  return app
}

function partyToJson(party: IParty) {
  return {
    id: party.id,
    rtpCapabilities: party.router.rtpCapabilities,
  }
}

function partyConnectionToJson(connection: IPartyConnection) {
  const { audioSendTransport, videoSendTransport } = connection
  return {
    audioSendTransport: transportToJson(audioSendTransport),
    videoSendTransport: transportToJson(videoSendTransport),
  }
}

function transportToJson(transport: WebRtcTransport) {
  const {
    id,
    iceParameters,
    iceCandidates,
    dtlsParameters,
    sctpParameters,
  } = transport
  return { id, iceParameters, iceCandidates, dtlsParameters, sctpParameters }
}
