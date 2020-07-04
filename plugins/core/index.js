import Vue from 'vue'
import Moment from 'moment' // lo hago accessible desde todos lados como this.$moment
import Swal from 'sweetalert2' // lo hago accessible desde todos lados como this.$swal
import Underscore from 'underscore'

import { mapGetters } from 'vuex'
import Filter from './filter'

Vue.mixin({
  computed: {
    ...mapGetters(['user']),
  },
})

Vue.use(Filter)
Vue.prototype.$swal = Swal
Vue.prototype.$moment = Moment
// Vue.prototype.$_ = Underscore

export default (_context, inject) => {
  // el inject lo deja disponible 100%% desde todos lados !! principalmente desde asyncData
  inject('_', Underscore)
}

Vue.prototype.$getRama = (value) => {
  switch (value) {
    case 'T':
      return { texto: 'Castores', color: 'warning' }
    case 'L':
      return { texto: 'Lobatos y Lobeznas', color: 'yellow' }
    case 'S':
      return { texto: 'Scout', color: 'success' }
    case 'C':
      return { texto: 'Caminante', color: 'primary' }
    case 'R':
      return { texto: 'Rover', color: 'danger' }
    case 'G':
      return { texto: 'Gestión', color: 'purple' }
  }
  return {}
}
