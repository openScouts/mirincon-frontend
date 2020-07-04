'use strict'
// const path = require('path')
const merge = require('deepmerge')
const nuxt = require('./base.config.js')

const extend = {
  head: {
    title: 'Pre Producción',
  },
  dev: false,
  env: {
    NODE_ENV: 'PreProduccion',
    PUSHER_APP_KEY: '2b49b415ebceaad1b5da',
    PUSHER_APP_CLUSTER: 'us2',
    API_HOST: 'https://api.prueba.mirincon.com.ar/api',
  },
  buildModules: [
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-169637242-2',
      },
    ],
  ],
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
    name: 'Mi Rincón PRUEBA',
    short_name: 'Mi Rincón PRUEBA',
  },
}

module.exports = merge(nuxt, extend)
