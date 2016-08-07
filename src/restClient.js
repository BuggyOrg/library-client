/** @module ClientAPI */
import request from 'request-promise-native'
import join from 'url-join'

const opt = (path, prefix) => (path)
  ? opt(prefix) + '/' + path
  : ''

const enc = encodeURIComponent

export default (server) => {
  const get = (path) => {
    return request(join(server, path)).then((data) => JSON.parse(data))
  }

  const post = (path, payload) => {
    return request({
      method: 'POST',
      uri: join(server, path),
      body: payload,
      json: true
    })
  }

  return {
    /**
     * Get information about the library server
     * @returns {Promise.<object>} An object containing the version of the server and its type.
     */
    info: () => get('info'),
    /**
     * Query all components in the library. Caution, depending on the database this could be lengthy.
     * @returns {Promise.<Array.<Component>>} An array of components.
     */
    components: () => get('components'),
    /**
     * Query the number of components in the database.
     * @returns {number} The number of components.
     */
    componentCount: () => get('components/count'),
    /**
     * Query a specific component by its meta key and optionally in a specific version.
     * @param {string} meta The meta key of the component.
     * @param {string} [version] A valid semver version. If no version is given the latest version is returned.
     * @returns {Promise.<Component>} The component with the meta ID.
     * @throws If no component with the given meta id or version exists. (You have to use Promise.catch(...) to get this error.)
     */
    component: (meta, version) => get('components/get/' + enc(meta) + opt(version)),
    /**
     * Add a component to the library.
     * @param {Component} component The Component you want to add to the library.
     * @returns {Promise} The component was added successfully.
     * @throws If there is already a component with the given meta id and version, or your component is not valid. (You have to use Promise.catch(...) to get this error.)
     */
    addComponent: (component) => post('components', component),
    /**
     * Get meta information for a specific component and a key at a given version. The key and version are optional.
     * @param {string} component The meta id for the component.
     * @param {string} [key] The key identifying the meta information you want to get. If you don't specify it (or pass `null`) all keys will be included.
     * @param {string} [version] The version of the component. If not specified it will use the latest version of the component.
     * @returns {Promise.<Object>} The value of the key or if no key was specified an object with all the meta keys as keys and their corresponding values.
     * @throws If the component does not exist in the specified version or the key is not defined.
     */
    meta: (component, key, version) => get('meta/' + enc(component) + opt(version, 'version') + opt(key)),
    /**
     * Add od set meta information for a meta key of a component.
     * @param {string} component The meta id of the component.
     * @param {string} key The meta key to set.
     * @param value A value for the meta key. Can be of any serializable type.
     * @returns {Promise} The meta key was successfully added.
     * @throws If the component is not defined.
     */
    addMeta: (component, key, value, version) => post('meta/' + enc(component) + opt(version, 'version') + '/' + key, {value}),
    /**
     * Get the configuration value specified by `key`.
     * @param {string} key The configuration key.
     * @returns {Promise} The configuration value.
     * @throws If the key is not defined.
     */
    config: (key) => get('config/' + key),
    /**
     * Add or set the value of an configuration key.
     * @param {string} key The configuration key.
     * @param value The value you want to set. This can be of any serializable type.
     */
    setConfig: (key, value) => post('config/' + key, {value}),
    /**
     * Export the whole library into one JSON document.
     * @returns {Promise.<Object>} The library as an JSON document.
     */
    export: () => get('export')
  }
}
