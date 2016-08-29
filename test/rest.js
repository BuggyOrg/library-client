/* global describe, it */

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import {fromJSON} from '../src/localClient'
// import _ from 'lodash'

chai.use(chaiAsPromised)
var expect = chai.expect

const defaultData = {
  Components: [],
  meta: [],
  config: []
}

const server = (data) => {
  data = data || defaultData
  return fromJSON(data)
}


describe('Client REST API', () => {
  it('accesses sever information', () => {
    return server()
    .then((api) => api.info())
    .then((info) => {
      expect(info).to.be.ok
      expect(info).to.have.property('version')
    })
  })

  it('queries component interface', () => {
    return server()
    .then((api) => Promise.all([api.components(), api.componentCount()]))
    .then((arr) => expect(arr).to.have.length(2))
  })

  it('can interact with components', () => {
    return server()
    .then((api) =>
      api.addComponent({componentId: 'blubb', version: '0.1.0', ports: [{name: 'out', type: 'output'}]})
      .then(() => api.component('blubb'))
      .then((cmp) => expect(cmp.version).to.equal('0.1.0'))
    )
  })

  it('can use special characters in component names', () => {
    return server()
    .then((api) =>
      api.addComponent({componentId: 'blubb@→/â', version: '0.1.0', ports: [{name: 'out', type: 'output'}]})
      .then(() => api.component('blubb@→/â'))
      .then((cmp) => expect(cmp.version).to.equal('0.1.0'))
    )
  })

  it('cannot set meta infos for not existing nodes', () => {
    return expect(server()
    .then((api) => api.addMeta('blubb', 'data', 4))
    ).to.be.rejected
  })

  it('can interact with meta information', () => {
    return server()
    .then((api) =>
      api.addComponent({componentId: 'blubb', version: '0.1.0', ports: [{name: 'out', type: 'output'}]})
      .then(() => api.addMeta('blubb', 'data', 4))
      .then(() => api.meta('blubb', 'data'))
      .then((val) => expect(val).to.equal(4))
    )
  })

  it('can set configuration options', () => {
    return server()
    .then((api) =>
      api.setConfig('config1', {data: 'a'})
      .then(() => api.config('config1'))
      .then((data) => expect(data).to.eql({data: 'a'}))
    )
  })
})
