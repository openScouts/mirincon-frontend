'use strict'

import fs from 'fs'
const path = require('path')
const merge = require('deepmerge')
const nuxt = require('./base.config.js')

const extend = {
  head: { title: 'Ambiente Local de desarrollo' },
  env: {
    NODE_ENV: 'local',
    PUSHER_APP_KEY: '2b49b415ebceaad1b5da',
    PUSHER_APP_CLUSTER: 'us2',
    API_HOST: process.env.API_HOST,
    BASE_URL: '/',
  },
}
const todo = merge(nuxt, extend)
/**
 *  Cargo los certificados solo en Local
 *  aparte lo cargo de esta forma, porque si lo paso x el marge, da error
 */
todo.server = {
  https: {
    key: fs.readFileSync(path.resolve(__dirname, 'localhost.key')),
    cert: fs.readFileSync(path.resolve(__dirname, 'localhost.cert')),
  },
}

module.exports = todo
