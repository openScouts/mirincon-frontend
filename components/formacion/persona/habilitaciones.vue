<template>
  <div>
    <template v-if="grid.items.length">
      <b-table striped hover small responsive stacked="md" :items="grid.items" :fields="grid.fields">
        <!--
        <template v-slot:cell(grupo)="data">{{ data.item.rel_grupo.codigo_full }}</template>

        METE pendiente de aval => avalado
        -->
        <template #cell(fecha)="data">{{ data.item.fecha | Date }}</template>
      </b-table>
    </template>
    <template v-else>
      <vacio texto="No existen habilitaciones cargadas en Mi Rincón."></vacio>
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
        fields: [
          { key: 'habilitacion', label: 'habilitacion' },
          { key: 'grupo', label: 'grupo' },

          { key: 'fecha', label: 'fecha' },
          { key: 'libro_folio', label: 'Libro y Folio' },
          //   vencimiento
        ],
        items: [],
      },
    }
  },
  computed: {
    personaUUID() {
      if (this.uuid === 'uuid') {
        // return this.user.persona.uuid;
      }
      return this.uuid
    },
  },
  mounted() {
    this.getHabilitacion()
  },
  methods: {
    getHabilitacion() {
      this.$axios.get('/formacion/habilitaciones/' + this.personaUUID).then((response) => {
        this.grid.items = response.data.data
        if (this.grid.items.length) {
          this.$parent.verHabilitaciones = true
        }
      })
    },
  },
}
</script>
