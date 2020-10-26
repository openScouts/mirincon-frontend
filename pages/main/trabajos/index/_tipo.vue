<template>
  <div class="card card-accent-primary">
    <div class="card-header">
      {{ titulo }}
    </div>
    <b-table class="table-sm" :items="grid.items" :fields="grid.fields">
      <template v-slot:cell(rel_curso.fecha)="data">{{ data.item.rel_curso.fecha | Date }}</template>
      <template v-slot:cell(f_entrega)="data">{{ data.item.f_entrega | Date }}</template>
      <template v-slot:cell(rel_trabajos_estado.nombre)="data">
        <span v-if="data.item.rel_trabajos_estado.nombre === 'Abierto'" class="badge badge-success"> Abierto </span>
        <span v-else class="badge badge-info">{{ data.item.rel_trabajos_estado.nombre }}</span>
      </template>

      <template v-slot:cell(opciones)="data">
        <nuxt-link :to="'/formacion/trabajos/' + data.item.uuid + '/detalle'" class="btn btn-sm btn-primary">
          <i class="fas fa-binoculars" />
          {{ textoAccion }}
        </nuxt-link>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titulo: null,
      grid: {
        items: [],
        fields: [
          { label: 'Experiencia', key: 'rel_curso.nombre' },
          { label: 'Fecha Experiencia', key: 'rel_curso.fecha' },
          { label: 'Fecha Entrega', key: 'f_entrega' },
          { label: 'cantidad', key: 'rel_participantes_count' },
          { label: 'Estado', key: 'rel_trabajos_estado.nombre' },
          { label: 'Opciones', key: 'opciones' },
        ],
      },
    }
  },
  computed: {
    tipo() {
      return this.$route.params.tipo
    },
    soyResponsable() {
      return this.tipo === 'mis_trabajos_responsable'
    },
    textoAccion() {
      if (this.soyResponsable) {
        return 'Gestionar Trabajos'
      }
      return 'Ver'
    },
  },
  watch: {
    $route() {
      this.getData(this.tipo)
    },
  },
  mounted() {
    this.getData(this.tipo)
  },
  methods: {
    getData(tipo) {
      if (tipo === undefined) {
        return
      }
      if (this.soyResponsable) {
        this.grid.fields[3].label = 'participantes'
        this.titulo = 'Listado de Trabajos en los que soy Responsable'
      } else {
        this.grid.fields[3].label = 'Tp Asigandos'
        this.titulo = 'Listado de Trabajos que tengo Asigandos'
      }

      this.$axios.get('/formacion/trabajos/' + tipo).then((response) => {
        this.grid.items = response.data.data
      })
    },
  },
}
</script>
