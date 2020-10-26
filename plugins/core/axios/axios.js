import Vue from 'vue'

import Errors from './Errores/Validacion' //
import ErrorComponent from './Errores/ErrorComponent'

Vue.component('error', ErrorComponent) // Componente de validacin de formulario
Vue.mixin({
  beforeCreate() {
    // Creo las Variables globales para poder manejar los errores en la validacion de formularios
    this.$options.$errors = {} // errors
    Vue.util.defineReactive(this.$options, '$errors', Errors)
    if (!this.$options.computed) {
      this.$options.computed = {}
    }
    this.$options.computed.$errors = () => {
      return this.$options.$errors
    }
  },
})

export default function ({ $axios, redirect, app }) {
  $axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
  $axios.defaults.baseURL = process.env.API_HOST
  // $axios.defaults.baseURL = '/api/'

  $axios.defaults.timeout = 30000 // 30 Segundos
  $axios.interceptors.response.use(
    (response) => {
      Errors.flush() // si esta todo OK, borro los mensajes de error
      if (response.status === 201) {
        if (response.data.estado === 'OK') {
          app.$noti(response.data.mensaje, 'success', 'Correcto')
        }
      } else if (response.status === 202) {
        if (response.data.estado === 'ERROR') {
          app.$noti(response.data.mensaje, 'danger', 'Se genero un error')
        }
      }
      return response
    },
    (error) => {
      if (!error.response) {
        // finalizo el loading con erorr
        // eslint-disable-next-line no-undef
        $nuxt.$loading.finish()
        app.$noti('Error en la coneccion con la Api, verifique su coneccion a internet', 'danger', 'Error de Coneccion')
      }

      if (error.response === 'ECONNABORTED') {
        // console.log('Problema de comunicación con la API')
        app.$noti('Problema de comunicación con el servidor', 'danger', 'Se genero un error')
      } else if (error.response.status === 401) {
        // Error de Login.
        app.$noti('Debe hacer login', 'danger', 'Session Finalizado')
        redirect('/login')
      } else if (error.response.status === 403) {
        app.$noti('Usted no tiene permisos para realizar dicha acción', 'danger', 'Problemas de Permisos')
      } else if (error.response.status === 418) {
        app.$noti(error.response.data.mensaje, 'danger', 'Se genero un error')
      } else if (error.response.status === 422) {
        Errors.fill(error.response.data.errors)
        app.$noti('Algunos de los datos están mal completados', 'danger', 'Se genero un error')
      } else if (error.response.status === 429) {
        app.$noti(
          'Se genero un bloqueo por parte del servidor, ya que existen demasiadas solicitudes, reintentar en unos minutos.',
          'danger',
          'Se genero un error'
        )
      }
      // si paso el error a reject, NUXT lo captura y me muestra pantalla de error !! eso no lo quiero !
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject(false)
    }
  )
}
