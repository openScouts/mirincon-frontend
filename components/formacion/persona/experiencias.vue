<template>
  <div>
    <download-excel
      class="btn btn-sm btn-success m-2"
      :data="grid.items"
      :fields="xls_campos"
      footer="****** Exportacion generada por Mi Rincon Scout ******"
      name="exportacion_formacion.xls"
    >
      Exportar
    </download-excel>
    <template v-if="grid.items.length">
      <b-table striped hover small responsive stacked="md" :items="grid.items" :fields="grid.fields">
        <template v-slot:cell(experiencia)="data">
          ({{ data.item.organismo_codigo }}) {{ data.item.experiencia }}
        </template>
        <template v-slot:cell(estado)="data">
          <div-experiencia-estado :estado="data.value" />
        </template>
        <template v-slot:cell(rama)="data">
          <div-rama :rama="data.value" />
        </template>
        <template v-slot:cell(fehaciente)="data">
          <template v-if="data.value === 'S'">
            <div class="text-success"><i class="fas fa-thumbs-up" /> Si</div>
          </template>
        </template>
        <template v-slot:cell(fecha)="data">{{ data.value | Date }}</template>
        <template v-slot:cell(opciones)="data">
          <template v-if="data.item.certificado">
            <button
              :key="data.item.uuid"
              v-promise-btn
              class="btn btn-primary btn-sm"
              variant="primary"
              @click="getCertificado(data.item.uuid, data.item.experiencia, data.item.fecha)"
            >
              <i class="fas fa-file-pdf" />
              Certificado
            </button>
          </template>
        </template>
      </b-table>
    </template>
    <template v-else>
      <vacio texto="No existen experiencias cargadas en Mi Rincón."></vacio>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    // Esto lo uso porque el componente lo llamo desde otros componentes
    uuid: { type: String, default: 'uuid' },
  },
  data() {
    return {
      grid: {
        // experiencia
        fields: [
          { label: 'Experiencia', key: 'experiencia', sortable: true },
          { label: 'Estado', key: 'estado', sortable: true },
          { label: 'Libro/Folio', key: 'libro_folio', sortable: false },
          { label: 'rama', key: 'rama', sortable: true },
          { label: 'fecha', key: 'fecha', sortable: true },
          { label: 'fehaciente', key: 'fehaciente', sortable: true },
          { label: 'opciones', key: 'opciones', sortable: false },
        ],
        items: [],
      },
      xls_campos: {
        Experiencia: 'experiencia',
        Estado: 'estado',
        Rama: {
          field: 'rama',
          callback: (value) => {
            const rama = this.$getRama(value)
            return rama.texto
          },
        },
        Fecha: {
          field: 'fecha',
          callback: (value) => {
            return this.$moment(value, 'YYYY-MM-DD').format('L')
          },
        },
        Fehaciente: {
          field: 'fehaciente',
          callback: (value) => {
            return value === 'S' ? 'Si' : 'No'
          },
        },
      },
    }
  },
  computed: {
    personaUUID() {
      if (this.uuid === 'uuid') {
        //  return this.user.persona.uuid;
      }
      return this.uuid
    },
  },

  mounted() {
    this.getExperiencias()
  },
  methods: {
    getCertificado(cursanteUuid, nombre, fecha) {
      return this.$axios({
        url: '/formacion/participantes/certificado/' + cursanteUuid,
        method: 'GET',
        responseType: 'blob', // important
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', fecha + '_' + nombre + '_' + '.pdf')
        document.body.appendChild(link)
        link.click()
      })
    },
    getExperiencias() {
      this.$axios.get('/formacion/experiencias/' + this.personaUUID).then((response) => {
        this.grid.items = response.data.data
      })
    },
  },
}
</script>
