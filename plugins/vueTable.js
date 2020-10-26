// https://github.com/matfish2/vue-tables-2/issues/68
import Vue from 'vue'
import { Event, ServerTable } from 'vue-tables-2'

export default ({ app: { $axios } }) => {
  Vue.use(
    ServerTable,
    {
      // https://github.com/matfish2/vue-tables-2/blob/master/lib/config/defaults.js
      skin: 'table table-striped table-hover table-sm ',
      orderBy: false,
      // columnsDropdown: true, //https://github.com/matfish2/vue-tables-2#columns-visibility
      debounce: 700, // Número de milisegundos inactivos (sin pulsación de tecla) a esperar antes de enviar una solicitud. Se utiliza para detectar cuándo el usuario finalizó su consulta para evitar solicitudes
      filterByColumn: false,
      highlightMatches: true, // Partidos destacados
      // dateFormat: 'YYYY/MM/DD',
      responseAdapter: (response) => {
        return {
          data: response.data.data,
          count: response.data.meta.total,
        }
      } /*
      requestKeys: {
        query: 'query',
        limit: 'limit',
        orderBy: 'orderBy',
        ascending: 'ascending',
        page: 'page',
        byColumn: 'byColumn'
      }, */,
      requestFunction(data) {
        return $axios
          .get(this.url, { params: data })
          .then((response) => {
            return response
          })
          .catch((e) => {
            this.dispatch('error', e)
          })
      },
      texts: {
        count: 'Mostrando {from} a {to} de {count} registros|{count} registros|Un registro',
        first: 'Primero',
        last: 'Ultimo',
        filter: 'Filtro:',
        filterPlaceholder: 'Buscar',
        limit: 'Registros:',
        page: 'Pagina:',
        noResults: 'No se encontraron Registos',
        filterBy: 'Filtrar por {column}',
        /* loading: 'Cargando...', */
        loading: 'Buscando Datos ...',
        defaultOption: 'Seleccionar {column}',
        columns: 'Columna',
      },
      sortIcon: {
        is: 'fa-sort',
        base: 'fas',
        up: 'fa-sort-up',
        down: 'fa-sort-down',
      },
    },
    false, // true, /* ACTIVO VUEX */
    'bootstrap4'
  )

  /// ////////////////////////////////////////////////////////////////////////////
  // Capturo el evenot de paginacion de ClientTable y hago un pequeño bloqueo y cambio las imagenes
  // /////////////////////////////////////////////////////////////////////////////
  // Se dispara cuando se envía una solicitud al servidor
  Event.$on('vue-tables.loading', () => {
    // eslint-disable-next-line no-undef
    $nuxt.$loading.start()
  })

  Event.$on('vue-tables.loaded', () => {
    // eslint-disable-next-line no-undef
    $nuxt.$loading.finish()
    // window.scrollTo(0, 0)
  })
}
