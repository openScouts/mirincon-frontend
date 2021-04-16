<template>
  <!-- http://rfvallina.com/blog/2017/12/18/select-value-from-parent-to-child-select-box-component-in-vue.html-->
  <div class="input-group">
    <select
      v-model="organismos_id"
      class="form-control form-control-sm"
      :disabled="desactivado"
      @input="
        (event) => {
          $emit('input', event.target.value)
        }
      "
    >
      <template v-for="grupo in organismos">
        <option :key="grupo.id" :value="grupo.id">{{ grupo.codigo_full }}</option>
      </template>
    </select>
    <div v-if="filtro" class="input-group-append" :disabled="desactivado">
      <b-dropdown slot="append" variant="success" size="sm" right>
        <template slot="button-content">
          <i class="fas fa-filter" />
          <span class="sr-only">Filtro</span>
        </template>
        <b-dropdown-header>Seleccione el tipo de Filtro</b-dropdown-header>
        <template v-if="user.organismos.distrito">
          <b-dropdown-item @click="getOrganismos('distrito')">Mi Distrito</b-dropdown-item>
        </template>
        <b-dropdown-item @click="getOrganismos('zona')">Mi Zona</b-dropdown-item>
        <b-dropdown-item @click="getOrganismos('todos')">Todos</b-dropdown-item>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filtro: {
      // Digo si se va a mostrar el boton de filtros
      type: Boolean,
      default: true,
      required: false,
    },
    value: {
      type: String,
      default: '9999',
      required: false,
    },
    filtrado: {
      // Opcion por defecto cuando muestro el combo
      type: String,
      default: 'distrito',
      required: false,
    },
  },
  data() {
    return {
      organismos_id: null,
      organismos: [], // obtengo el listado de organismos.
      desactivado: true,
      query: {
        zona: null,
        distrito: null,
      },
    }
  },
  watch: {
    // campo this.value
    value(newValue) {
      if (newValue !== null) {
        this.organismos_id = newValue
      }
    },
  },
  mounted() {
    this.getOrganismos(this.filtrado)
    // console.log(this.user.organismos);
  },
  methods: {
    getOrganismos(tipo) {
      this.desactivado = true
      switch (tipo) {
        case 'distrito':
          this.query.distrito = this.user.organismos.distrito
          this.query.zona = this.user.organismos.zona
          break
        case 'zona':
          this.query.distrito = null
          this.query.zona = this.user.organismos.zona
          break
        case 'todos':
          this.query.distrito = null
          this.query.zona = null
          break
        default:
          this.query.distrito = null
          this.query.zona = this.user.organismos.zona
          break
      }

      this.$axios
        .get('/organismos', {
          params: {
            limit: 99999,
            distrito: this.query.distrito,
            zona: this.query.zona,
          },
        })
        .then((response) => {
          this.organismos = response.data.data
        })
        .finally(() => {
          this.desactivado = false
        })
    },
  },
}
</script>
