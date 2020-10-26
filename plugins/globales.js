import Vue from 'vue'
import VuePromiseBtn from 'vue-promise-btn'
import 'vue-promise-btn/dist/vue-promise-btn.css'
import CoreuiVue from '@coreui/vue'

Vue.use(VuePromiseBtn, {
  minTimeout: 2500, // le pongo un pausa de 2.5 segundos.. evito doble click de forma burda
})

// Register a global custom directive called `v-focus`
// Ejemplo de uso => <input v-focus>
Vue.directive('focus', {
  inserted(el) {
    // When the bound element is inserted into the DOM...
    el.focus()
  },
})

Vue.use(CoreuiVue)

/*
Vue.prototype.$noti = function(texto, tipo = 'success', titulo = 'Notificacion', toaster = 'b-toaster-top-right') {
  console.log('sssssssssssssssssss')
  /*
  this.$bvToast.toast(texto, {
    title: titulo,
    variant: tipo,
    autoHideDelay: 5000,
    appendToast: true,
    toaster: toaster
  })* /
} */
