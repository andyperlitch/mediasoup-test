import * as mediasoupClient from 'mediasoup-client'

let device

try {
  device = new mediasoupClient.Device()
  console.log(`browser is supported`)
} catch (error) {
  if (error.name === 'UnsupportedError') console.warn('browser not supported')
}
