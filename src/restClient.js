
import request from 'request-promise-native'
import join from 'url-join'

const opt = (path, prefix) => (path)
  ? opt(prefix) + '/' + path
  : ''

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
    info: () => get('info'),
    components: () => get('components'),
    componentCount: () => get('components/count'),
    component: (meta, version) => get('components/get/' + meta + opt(version)),
    addComponent: (component) => post('components', component),
    meta: (component, key, version) => get('meta/' + component + opt(version, 'version') + opt(key)),
    addMeta: (component, key, value, version) => post('meta/' + component + opt(version, 'version') + '/' + key, {value}),
    config: (key) => get('config/' + key),
    setConfig: (key, value) => post('config/' + key, {value}),
    export: () => get('export')
  }
}
