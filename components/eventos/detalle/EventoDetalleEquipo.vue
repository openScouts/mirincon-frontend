<template>
  <div>
    <button v-b-modal.modal_formador class="btn btn-primary float-right clearfix m-2">
      <i class="fas fa-user-plus"></i>
      Agregar nuevo Integrante
    </button>

    <b-table striped hover small responsive stacked="md" :items="grid.items" :fields="grid.fields">
      <template v-slot:cell(persona)="data">
        <div-persona :persona="data.value" />
      </template>
      <template v-slot:cell(opciones)="data">
        <btn-persona-ver :uuid="data.item.persona.uuid" />
        <button
          v-promise-btn
          :title="'Dar de Baja a ' + data.item.persona.apellidoynombre"
          class="btn btn-danger btn-sm"
          @click="bajaFormador(data.item.uuid)"
        >
          <i class="fas fa-user-minus"></i>
        </button>
      </template>
    </b-table>

    <b-modal id="modal_formador" ref="ModalFormador" title="Incorporar Nuevo Formador al equipo" centered hide-footer>
      <div class="row">
        <div class="col-12 p-2">
          <input-persona v-model="form.persona_uuid"></input-persona>
        </div>
      </div>
      <button v-promise-btn class="btn-block btn btn-success" @click="agregarFormador()">Agregar</button>
    </b-modal>
  </div>
</template>

<style scoped>
.VueTables >>> * tr th:nth-child(1) {
  width: 30%;
}
</style>
<script>
export default {
  props: {
    eventoUuid: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      form: {},
      grid: {
        fields: [
          {
            label: 'Datos',
            key: 'persona',
          },
          {
            label: 'opciones',
            key: 'opciones',
          },
        ],
        items: [],
      },
    }
  },
  created() {
    this.obtenerEquipo()
  },
  methods: {
    obtenerEquipo() {
      return this.$axios.get('/eventos/equipo/' + this.eventoUuid).then((response) => {
        this.grid.items = response.data.data
      })
    },
    agregarFormador() {
      this.form.evento_uuid = this.eventoUuid
      return this.$axios.post('/eventos/equipo', this.form).then(() => {
        this.form = {} // borro x las dudas .. solo de molesto
        this.obtenerEquipo()
      })
    },
    bajaFormador(uuid) {
      return this.$axios.delete('/eventos/equipo', { params: { uuid } }).then(() => {
        this.obtenerEquipo()
      })
    },
  },
}
</script>
