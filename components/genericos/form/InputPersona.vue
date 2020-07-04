<template>
  <div class="input-group mb-3" :class="classe">
    <input
      v-model="nombre"
      type="text"
      class="form-control"
      readonly
      placeholder="Buscar Persona === >>"
      @input="$emit('input', $event.target.value)"
    />
    <div class="input-group-append">
      <span v-b-modal.myModalCampoResponsable class="input-group-text">
        <i class="fas fa-search" />
      </span>
    </div>
    <b-modal
      id="myModalCampoResponsable"
      ref="myModalCampoResponsable"
      title="Busqueda de Persona"
      size="xl"
      hide-footer
      centered
    >
      <div class="row">
        <div class="col-9">
          <b-form-input v-model="buscar" size="sm" name="documento" placeholder="Nombre o Documento" />
        </div>
        <div class="col-3">
          <button v-promise-btn class="btn btn-primary btn-sm btn-block" @click.prevent="getBusqueda()">Buscar</button>
        </div>
        <div v-if="grid.tableData.length" class="col-12">
          <br />
          <b-table :items="grid.tableData" :fields="grid.columns">
            <template v-slot:cell(nombre)="data">
              <div-persona :persona="data.item" />
            </template>
            <template v-slot:cell(funcion)="data">
              <div-funciones :funciones="data.item.funciones" />
            </template>
            <template v-slot:cell(opciones)="data">
              <button class="btn btn-success btn-sm" @click="setPersonaUuid(data.item.uuid, data.item.apellidoynombre)">
                Seleccionar
              </button>
            </template>
          </b-table>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<style scoped>
table >>> th:nth-child(1) {
  width: 35%;
}
table >>> th:nth-child(2) {
  width: 55%;
}
table >>> th:nth-child(3) {
  width: 10%;
}
</style>
<script>
export default {
  props: {
    value: {
      required: false,
      type: String,
      default: '',
    },
    classe: {
      type: String,
      required: false,
      default: '',
    },
    tipo: {
      // SI acepta adultos o beneficiarios o todo
      type: String,
      required: false,
      default: 'A',
    },
    estado: {
      // miembros o ex miembros
      type: String,
      required: false,
      default: 'S',
    },
  },
  data() {
    return {
      grid: {
        columns: ['nombre', 'funcion', 'opciones'],
        tableData: [],
      },
      buscar: '',
      nombre: null,
    }
  },
  watch: {
    // campo this.value
    value(newValue) {
      this.getPersona(newValue)
    },
  },
  created() {
    this.getPersona(this.value)
  },
  methods: {
    setPersonaUuid(personaUuid, apellidoynombre) {
      this.$emit('input', personaUuid)
      this.nombre = apellidoynombre

      /* Para que funciones el V-model desde fuera del componente */
      this.$refs.myModalCampoResponsable.hide()
      this.grid.tableData = [] // blanqueo variables por si abre de nuevo la ventana de busqueda
      this.buscar = '' // blanqueo variables por si abre de nuevo la ventana de busqueda
    },

    getPersona(personaUuid) {
      if (personaUuid === '' || personaUuid === undefined || personaUuid === null) {
        return
      }
      return this.$axios.get('/persona/personas/get_nombre/' + personaUuid).then((response) => {
        this.nombre = response.data
      })
    },

    getBusqueda() {
      if (this.buscar === '') {
        this.$noti('Debe ingresar un patron de busqueda', 'info')
        return Promise.resolve()
      }

      return this.$axios
        .get('/persona/personas/busqueda/basica', {
          params: {
            query: this.buscar,
            tipo: this.tipo,
            afiliado: this.estado,
          },
        })
        .then((response) => {
          this.grid.tableData = response.data.data
        })
    },
  },
}
</script>
