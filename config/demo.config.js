'use strict'
// const path = require('path')
const merge = require('deepmerge')
const nuxt = require('./base.config.js')

const extend = {
  head: {
    title: 'DEMO',
  },
  dev: false,
  env: {
    NODE_ENV: 'DEMO',
    PUSHER_APP_KEY: 'sadasdas',
    PUSHER_APP_CLUSTER: 'asdasd',
    API_HOST: 'https://api.demo.mirincon.com.ar/api',
  },
  oneSignal: {
    init: {
      appId: '6f916b01-808e-4c5c-8682-c6314c48d2e7',
    },
  },
  vue: {
    config: {
      productionTip: false,
      devtools: false,
    },
  },
  manifest: {
    name: 'Mi Rincón DEMO',
    short_name: 'Mi Rincón DEMO',
  },
}

module.exports = merge(nuxt, extend)
