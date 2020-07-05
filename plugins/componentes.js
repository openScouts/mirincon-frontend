import Vue from 'vue'

/** *************************************************************************************
 *  COMPONENTES DE Terceros
 ************************************************************************************** */
Vue.component('downloadExcel', (r) => require.ensure([], () => r(require('vue-json-excel').default), 'js/component'))
/** *************************************************************************************
 *  COMPONENTES PROPIOS
 ************************************************************************************** */

Vue.component('ContentWrapper', (r) =>
  require.ensure([], () => r(require('~/components/genericos/ContentWrapper.vue').default), 'js/component')
)

Vue.component('foto', (r) =>
  require.ensure([], () => r(require('~/components/genericos/Foto.vue').default), 'js/component')
)
Vue.component('btn-persona-ver', (r) =>
  require.ensure([], () => r(require('~/components/genericos/BtnPersonaVer.vue').default), 'js/component')
)
Vue.component('titulo', (r) =>
  require.ensure([], () => r(require('~/components/genericos/Titulo.vue').default), 'js/component')
)
Vue.component('btn-app', (r) =>
  require.ensure([], () => r(require('~/components/genericos/BtnApp.vue').default), 'js/component')
)
Vue.component('div-persona', (r) =>
  require.ensure([], () => r(require('~/components/genericos/div/DivPersona.vue').default), 'js/component')
)
Vue.component('div-funciones', (r) =>
  require.ensure([], () => r(require('~/components/genericos/div/DivFunciones.vue').default), 'js/component')
)
Vue.component('div-experiencia-estado', (r) =>
  require.ensure([], () => r(require('~/components/genericos/div/DivExperienciaEstado.vue').default), 'js/component')
)

Vue.component('div-trabajo-participante-estado', (r) =>
  require.ensure(
    [],
    () => r(require('~/components/genericos/div/DivTrabajoParticipanteEstado.vue').default),
    'js/component'
  )
)

Vue.component('div-rama', (r) =>
  require.ensure([], () => r(require('~/components/genericos/div/DivRama.vue').default), 'js/component')
)
Vue.component('alerta', (r) =>
  require.ensure([], () => r(require('~/components/genericos/Alerta.vue').default), 'js/component')
)
Vue.component('select-organismos', (r) =>
  require.ensure([], () => r(require('~/components/genericos/form/SelectOrganismos.vue').default), 'js/component')
)
Vue.component('select-ramas', (r) =>
  require.ensure([], () => r(require('~/components/genericos/form/SelectRamas.vue').default), 'js/component')
)

Vue.component('input-persona', (r) =>
  require.ensure([], () => r(require('~/components/genericos/form/InputPersona.vue').default), 'js/component')
)

Vue.component('vacio', (r) =>
  require.ensure([], () => r(require('~/components/genericos/Vacio.vue').default), 'js/component')
)

Vue.component('download', (r) =>
  require.ensure([], () => r(require('~/components/genericos/Download.vue').default), 'js/component')
)
