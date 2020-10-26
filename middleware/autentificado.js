import Vue from 'vue'

export default function ({ store, error, route, redirect }) {
  // Obtenga autorizaciones para rutas emparejadas (con rutas para hijos también)
  route.meta.map((meta) => {
    if (meta.auth && typeof meta.auth.permiso !== 'undefined') {
      if (Vue.prototype.$can(meta.auth.permiso)) {
        return true
      }
      // Si  llego aca .. doy error de que no tiene permisos
      return error({
        statusCode: 401,
        message:
          'No tiene permisos para acceder al modulo \n' /* +
            'SE ENVIÓ UN MAIL AL ADMINISTRADOR INFORMANDO LAS ACCIONES' */,
      })
    }
  })
}
