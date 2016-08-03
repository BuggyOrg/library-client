
import restClient from './restClient'
import portfinder from 'portfinder'
import {serve, serveJSON} from '@buggyorg/library-fileserver'

const findPort = () => {
  return new Promise((resolve, reject) => {
    portfinder.getPort((err, port) => {
      if (err) reject(err)
      else resolve(port)
    })
  })
}

const defaultData = {
  components: [],
  meta: [],
  config: []
}

const server = (data, serveFn) => {
  data = data || defaultData
  return findPort()
  .then((port) => {
    serveFn(port, data)
    return restClient('http://localhost:' + port)
  })
}

export function fromJSON (json) {
  return server(json, serveJSON)
}

export function fromFile (file) {
  return server(file, serve)
}
