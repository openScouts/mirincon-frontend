<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo><span class="fas os-accion-trabajo" />Listado de Trabajos</titulo>
    </template>
    <div class="card card-accent-primary">
      <div class="card-body">
        <b-row>
          <b-col sm="12" lg="3" class="mb-0">
            <b-form-group label="Ingrese un parametro de busqueda" class="mb-0">
              <b-form-input v-model="options.params.query" size="sm" name="documento" placeholder="Nombre del Evento" />
            </b-form-group>
          </b-col>
          <b-col sm="12" lg="3" class="mb-0">
            <b-form-group label="Estado" class="mb-0">
              <b-form-select v-model="options.params.archivado" size="sm" class="mb-3">
                <option value="N">Trabajos Activos</option>
                <option value="S">Trabjos Archivados</option>
                <option value="">Todos</option>
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col sm="12" lg="12">
            <button class="btn btn-primary" @click.prevent="getBusqueda()">Buscar</button>
          </b-col>
        </b-row>
      </div>
    </div>

    <div class="card card-accent-primary">
      <v-server-table ref="tabla" :columns="columns" :options="options" url="/formacion/trabajos">
        <template slot="f_entrega" slot-scope="props">{{ props.row.f_entrega | Date }}</template>
        <template slot="rel_curso.fecha" slot-scope="props">{{ props.row.rel_curso.fecha | Date }}</template>
        <template slot="opciones" slot-scope="props">
          <nuxt-link :to="'/formacion/trabajos/' + props.row.uuid">Ver</nuxt-link>
        </template>
        <template slot="rel_trabajos_estado.nombre" slot-scope="props">
          <span v-if="props.row.rel_trabajos_estado.nombre === 'Abierto'" class="badge badge-success">
            Abierto
          </span>
          <span v-else class="badge badge-info">{{ props.row.rel_trabajos_estado.nombre }}</span>
        </template>
      </v-server-table>
    </div>
  </ContentWrapper>
</template>

<style scoped>
/* Defino el Ancho de la primer columna*/
.VueTables >>> * tr th:nth-child(1) {
  width: 30%;
}

.VueTables >>> * tr th:nth-child(2) {
  width: 15%;
}

.VueTables >>> * tr th:nth-child(3) {
  width: 15%;
}
</style>

<script>
export default {
  meta: {
    auth: {
      permiso: 'formacion.trabajos',
    },
  },
  data() {
    return {
      columns: [
        'rel_curso.nombre',
        'f_entrega',
        'rel_curso.fecha',
        'rel_curso.responsable',
        'rel_participantes_count',
        'rel_trabajos_estado.nombre',
        'opciones',
      ],
      options: {
        filterable: false,
        params: {
          archivado: 'N',
        },
        headings: {
          'rel_curso.nombre': 'Experiencia',
          f_entrega: 'F Entrega',
          'rel_curso.fecha': 'F Experiencia',
          'rel_curso.responsable': 'Responsable',
          'rel_trabajos_estado.nombre': 'Estado',
          rel_participantes_count: 'participantes',
        },
        sortable: ['apellidoynombre'],
      },
    }
  },
  methods: {
    getBusqueda() {
      this.$refs.tabla.data = []
      this.$refs.tabla.loading = true
      this.$refs.tabla.refresh()
    },
  },
}
</script>
