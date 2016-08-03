
import localClient from './localClient'
import restClient from './restClient'

export function fromFile (file) {
  return localClient.fromFile(file)
}

export function fromJSON (json) {
  return localClient.fromJSON(json)
}

export function connect (server) {
  return restClient(server)
}
