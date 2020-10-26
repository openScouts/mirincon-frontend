import Vue from 'vue'
// import Store from 'vuex'
import Underscore from 'underscore'

function buscaValor(array, value) {
  const myReg = new RegExp('^' + value + '.*$')
  const evens = Underscore.filter(array, (permiso) => {
    return permiso.match(myReg)
  })
  // console.log(evens);
  return evens
}

// export default function ({ store, route, redirect, req, res, isClient, isServer, app: { $axios } }) {
export default function ({ store }) {
  // Puedo pasar un permiso completo o permiso parcial.
  // gestion.membresia => permiso completo
  // gestion => permiso parcial.
  Vue.prototype.$can = (permiso) => {
    if (store.state.auth.user.permisos === undefined) {
      return false
    }
    // Obtengo todos los Permisos del Usuarios
    const permisos = store.state.auth.user.permisos
    // Valido si existe un permiso
    const TIENE_PERMISOS = buscaValor(permisos, permiso)

    if (TIENE_PERMISOS.length > 0) {
      return true
    }
    return false
  }
}
