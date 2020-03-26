// @ts-check
import * as mediasoupClient from 'mediasoup-client'
import io from 'socket.io-client'

main().catch(e => {
  console.error('An error occurred')
  console.error(e)
})

async function main() {
  // const device = getDevice()

  // const routerRtpCapabilities = await getRouterRtpCapabilities()
  // await device.load({ routerRtpCapabilities })
  const socket = io()
  socket.emit('mymessage', { foo: 'bar' })

  // create the party
  const party = await createParty()

  // join the party
  const partyConnection = await joinParty(party.id)
  console.log('partyConnection', partyConnection)

  // set up the device
  const device = await getDevice({
    routerRtpCapabilities: party.rtpCapabilities,
    partyConnection,
  })
}

async function createParty() {
  const party = await fetch('/parties', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await party.json()
}

async function joinParty(partyId) {
  const connection = await fetch(`/parties/${partyId}/join`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await connection.json()
}

async function getDevice({ routerRtpCapabilities, partyConnection }) {
  let device

  try {
    device = new mediasoupClient.Device()
    await device.load({ routerRtpCapabilities })

    if (!device.canProduce('video') && !device.canProduce('audio')) {
      throw new Error(`This device/browser cannot produce video or audio`)
    } else {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        // video: true,
        video: false,
      })
      const audioTrack = stream.getAudioTracks()[0]
      const sendTransport = device.createSendTransport(
        partyConnection.audioSendTransport
      )

      sendTransport.on('connect', (...args) => {
        console.log('connected on audio transport', ...args)
      })
      sendTransport.on('produce', (...args) => {
        console.log('produce event on transport', ...args)
      })

      await sendTransport.produce({
        track: audioTrack,
      })

      // const videoTrack = stream.getVideoTracks()[0];

      return device
    }
  } catch (error) {
    if (error.name === 'UnsupportedError') {
      console.warn('browser not supported')
    } else {
      console.error(error)
    }
  }
}
