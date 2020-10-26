<template>
  <div class="card card-accent-primary">
    <div class="card-header">Listado de mis Trabajos</div>
    <template v-if="grid.items.length === 0">
      <vacio texto="No se encontraron trabajos a mostrar"></vacio>
    </template>
    <template v-else>
      <b-table :items="grid.items" :fields="grid.fields" striped hover small responsive>
        <template v-slot:cell(entrega)="data">{{ data.item.fecha_entrega | Date }}</template>
        <template v-slot:cell(estado)="data">
          <div-trabajo-participante-estado :estado="data.item.estado"></div-trabajo-participante-estado>
        </template>
        <template v-slot:cell(opciones)="data">
          <template v-if="data.item.uuid">
            <nuxt-link
              :to="'/formacion/trabajos/' + data.item.trabajo_uuid + '/participante/' + data.item.uuid"
              class="btn btn-primary btn-sm"
            >
              <i class="fas fa-binoculars" />
              Ver
            </nuxt-link>
          </template>
        </template>
      </b-table>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      grid: {
        items: [],
        fields: [
          { label: 'Experiencia', key: 'experiencia' },
          { label: 'Formador', key: 'asignado' },
          { label: 'Fecha Entrega', key: 'entrega' },
          { label: 'Estado', key: 'estado' },
          { label: 'Opciones', key: 'opciones' },
        ],
      },
    }
  },
  mounted() {
    this.$axios.get('/formacion/mis_trabajos').then((response) => {
      this.grid.items = response.data.data
    })
  },
}
</script>
