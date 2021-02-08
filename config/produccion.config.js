'use strict'
// const path = require('path')
const merge = require('deepmerge')
const nuxt = require('./base.config.js')

const extend = {
  head: {
    title: 'Mi Rincón Scout',
  },
  dev: false,
  env: {
    NODE_ENV: 'production',
    PUSHER_APP_KEY: '"40a3f051148f3dc7857f"',
    PUSHER_APP_CLUSTER: '"us2"',
    API_HOST: 'https://api.mirincon.com.ar/api',
  },
  modules: ['@nuxtjs/onesignal'], // , '@nuxtjs/sentry'
  buildModules: [
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-169637242-1',
      },
    ],
  ],
  oneSignal: {
    init: {
      appId: '1713727f-18f5-49fb-9e06-cdf4688deb55',
      allowLocalhostAsSecureOrigin: true,
      welcomeNotification: {
        disable: true,
      },
    },
  },
  vue: {
    config: {
      productionTip: true,
      devtools: false,
    },
  },
}

module.exports = merge(nuxt, extend)
