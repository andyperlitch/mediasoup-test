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
}

async function getRouterRtpCapabilities() {}

function getDevice() {
  let device

  try {
    device = new mediasoupClient.Device()
    console.log(`browser is supported`)
    return device
  } catch (error) {
    if (error.name === 'UnsupportedError') console.warn('browser not supported')
  }
}
