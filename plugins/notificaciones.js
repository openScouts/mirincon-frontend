// Forma correcta de registrar un componente
// https://medium.com/@valerka/how-to-register-the-plugin-correctly-in-nuxt-js-91ed2d95b81f
import Vue from 'vue'

export default (_context, inject) => {
  // inject('bvToast', ToastPlugin)
  inject('noti', (texto, tipo = 'success', titulo = 'Notificacion', toaster = 'b-toaster-top-right') => {
    // Maldita solucion, si no hago un NEW VUE no me detacta la instancia de $bvToast
    // https://www.gitmemory.com/issue/bootstrap-vue/bootstrap-vue/3262/511722007
    const vm = new Vue()
    vm.$bvToast.toast(texto, {
      title: titulo,
      noCloseButton: true,
      variant: tipo,
      toaster,
    })
    // console.log(context.$bvToast)
  })
}
