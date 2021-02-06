import Vue from 'vue'

/** *************************************************************************************
 *  COMPONENTES DE Terceros
 ************************************************************************************** */
Vue.component('DownloadExcel', (r) => require.ensure([], () => r(require('vue-json-excel').default), 'js/component'))
/** *************************************************************************************
 *  COMPONENTES PROPIOS
 ************************************************************************************** */

Vue.component('ContentWrapper', (r) =>
  require.ensure([], () => r(require('~/components/genericos/ContentWrapper.vue').default), 'js/component')
)

Vue.component('Foto', (r) =>
  require.ensure([], () => r(require('~/components/genericos/Foto.vue').default), 'js/component')
)
Vue.component('BtnPersonaVer', (r) =>
  require.ensure([], () => r(require('~/components/genericos/BtnPersonaVer.vue').default), 'js/component')
)
Vue.component('Titulo', (r) =>
  require.ensure([], () => r(require('~/components/genericos/Titulo.vue').default), 'js/component')
)
Vue.component('BtnApp', (r) =>
  require.ensure([], () => r(require('~/components/genericos/BtnApp.vue').default), 'js/component')
)
Vue.component('DivPersona', (r) =>
  require.ensure([], () => r(require('~/components/genericos/div/DivPersona.vue').default), 'js/component')
)
Vue.component('DivFunciones', (r) =>
  require.ensure([], () => r(require('~/components/genericos/div/DivFunciones.vue').default), 'js/component')
)
Vue.component('DivExperienciaEstado', (r) =>
  require.ensure([], () => r(require('~/components/genericos/div/DivExperienciaEstado.vue').default), 'js/component')
)

Vue.component('DivTrabajoParticipanteEstado', (r) =>
  require.ensure(
    [],
    () => r(require('~/components/genericos/div/DivTrabajoParticipanteEstado.vue').default),
    'js/component'
  )
)

Vue.component('DivRama', (r) =>
  require.ensure([], () => r(require('~/components/genericos/div/DivRama.vue').default), 'js/component')
)
Vue.component('Alerta', (r) =>
  require.ensure([], () => r(require('~/components/genericos/Alerta.vue').default), 'js/component')
)
Vue.component('SelectOrganismos', (r) =>
  require.ensure([], () => r(require('~/components/genericos/form/SelectOrganismos.vue').default), 'js/component')
)
Vue.component('SelectRamas', (r) =>
  require.ensure([], () => r(require('~/components/genericos/form/SelectRamas.vue').default), 'js/component')
)

Vue.component('InputPersona', (r) =>
  require.ensure([], () => r(require('~/components/genericos/form/InputPersona.vue').default), 'js/component')
)

Vue.component('Vacio', (r) =>
  require.ensure([], () => r(require('~/components/genericos/Vacio.vue').default), 'js/component')
)

Vue.component('Download', (r) =>
  require.ensure([], () => r(require('~/components/genericos/Download.vue').default), 'js/component')
)
