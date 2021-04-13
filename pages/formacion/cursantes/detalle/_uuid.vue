<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Legajo de formacion de {{ persona.apellidoynombre }}</titulo>
    </template>
    <template v-if="persona">
      <b-alert v-if="persona.afiliacion === false" show variant="danger">
        La Persona no se encuentra Afiliada, Verifique los datos en CDS
      </b-alert>
    </template>

    <b-row>
      <b-col v-if="!$_.size(grid.items)" sm="12" lg="12">
        <div class="card card-accent-primary">
          <vacio texto="Buscando Datos"></vacio>
        </div>
      </b-col>
      <b-col v-if="$_.size(grid.items)" sm="12" lg="12">
        <div class="card card-accent-primary">
          <b-table striped hover small responsive stacked="md" :items="grid.items" :fields="grid.fields">
            <template #cell(experiencia)="data">
              <div class="item">
                <strong class="text-muted">Experiencia: </strong>
                {{ data.item.experiencia }}
              </div>
              <div class="item">
                <strong class="text-muted">Organismo: </strong>
                {{ data.item.organismo }}
              </div>
              <div class="item">
                <strong class="text-muted">Origen: </strong>
                {{ data.item.origen }}
              </div>
            </template>
            <template #cell(fecha)="data">
              <div class="item">
                <strong class="text-muted">Estado: </strong>
                <div-experiencia-estado :estado="data.item.estado" />
              </div>
              <div class="item">
                <strong class="text-muted">Fehaciente: </strong>
                <template v-if="data.item.fehaciente === 'S'">
                  <div class="text-success"><i class="fas fa-thumbs-up" /> Si</div>
                </template>
              </div>
              <div v-if="data.item.rama" class="item">
                <strong class="text-muted">Rama: </strong>
                <div-rama :rama="data.item.rama" />
              </div>
              <div class="item">
                <strong class="text-muted">fecha: </strong>
                {{ data.item.fecha | Date }}
              </div>
              <div v-if="data.item.libro_folio" class="item">
                <strong class="text-muted">Libro y Folio: </strong>
                {{ data.item.libro_folio }}
              </div>
            </template>
            <template #cell(observaciones)="data">
              <template v-for="value in data.value">
                <div :key="value.fecha">
                  <strong class="text-muted">{{ value.fecha | Date }} - {{ value.creador }}</strong>
                  <div>
                    <strong class="text-muted">observacion: </strong>
                    <div v-html="value.observacion" />
                  </div>
                </div>
              </template>
            </template>
            <template #cell(opciones)="data">
              <download
                v-if="data.item.certificado"
                :url="'/formacion/participantes/certificado/' + data.item.uuid"
                :nombre="data.item.fecha + '_' + data.item.experiencia + '_' + '.pdf'"
              >
                <i class="fas fa-file-pdf" />
                Certificado
              </download>
              <button
                title="Editar"
                class="btn btn-warning btn-sm text-white"
                @click="$refs.modalEditar.open(data.item)"
              >
                <i class="fas fa-edit"></i> Editar
              </button>
            </template>
          </b-table>
        </div>
      </b-col>
    </b-row>
    <modal-editar ref="modalEditar" />
  </ContentWrapper>
</template>

<script>
import Vue from 'vue'
import modalEditar from './modalEditarEstadoCursante.vue'

Vue.component('ModalEditar', modalEditar)
export default {
  meta: {
    auth: { permiso: 'formacion.cursantes' },
  },
  data() {
    return {
      persona: {},
      datos: {},
      persona_full: {},

      grid: {
        // experiencia
        fields: [
          { label: 'Experiencia', key: 'experiencia', sortable: true },
          { label: 'Estado', key: 'fecha', sortable: true },
          { label: 'Observaciones', key: 'observaciones' },
          { label: 'opciones', key: 'opciones', sortable: false },
        ],
        items: [],
      },
    }
  },
  computed: {
    uuid() {
      return this.$route.params.uuid
    },
  },
  created() {
    this.getPersona()
    this.getExperiencias()
  },
  methods: {
    tabs(tipo) {
      this.tab = tipo
    },
    getPersona() {
      this.$axios.get('/persona/personas/' + this.uuid).then((response) => {
        this.persona = response.data
      })
    },
    getExperiencias() {
      this.$axios.get('/formacion/experiencias/' + this.uuid).then((response) => {
        this.grid.items = response.data.data
      })
    },
  },
}
</script>

<style scoped>
.item > strong {
  display: inline;
  padding-right: 3px;
  text-transform: capitalize;
}
.item > div {
  display: inline;
}

button {
  padding: 2px;
}

* >>> tr th:nth-child(1) {
  width: 35% !important;
}

* >>> tr th:nth-child(2) {
  width: 15% !important;
}

* >>> tr th:nth-child(3) {
  width: 35% !important;
}
* >>> tr th:nth-child(4) {
  width: 15% !important;
}
</style>
