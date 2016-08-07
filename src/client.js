
import * as localClient from './localClient'
import restClient from './restClient'

/**
 * Create a client that connects to the specified json file. This storage is (currently) not persistent.
 * @params {string} file The database file. It must contain an array of `components`, a meta map in
 * the format `json.meta.COMPONENT.KEY = {value: VALUE}` and a key value store for configuration values.
 * @returns {ClientAPI} The client API to the file store as described in {@link module:ClientAPI}.
 */
export function fromFile (file) {
  return localClient.fromFile(file)
}

/**
 * Create a client that connects to the specified json document. This storage is not persistent.
 * @params {Object} json The database contents. It must contain an array of `components`, a meta map in
 * the format `json.meta.COMPONENT.KEY = {value: VALUE}` and a key value store for configuration values.
 * @returns {ClientAPI} The client API to the JSON store as described in {@link module:ClientAPI}.
 */
export function fromJSON (json) {
  return localClient.fromJSON(json)
}

/**
 * Create a connection to the given server.
 * @params {string} server An URL to the servers REST API
 * @returns {ClientAPI} The client API as described in {@link module:ClientAPI}.
 */
export function connect (server) {
  return restClient(server)
}
