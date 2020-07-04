<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>administrador de Experiencias</titulo>
    </template>
    <btn-app to="/formacion/experiencias/listado" icon="fa os-scout-saludo">Listado</btn-app>

    <b-row>
      <b-col md="12" lg="8">
        <hr />
        <div class="card card-accent-primary">
          <div class="card-header">Experiencias Pendientes de Cierre</div>

          <b-table :items="grid.items" :fields="grid.fields" striped hover small responsive stacked="md">
            <template v-slot:cell(experiencia)="data">
              <strong> {{ data.item.experiencia }}</strong>
              <div class="text-muted">
                <strong>Organismo: </strong>
                {{ data.item.organismo }}
              </div>
              <div class="text-muted">
                <strong>Responsable: </strong>
                {{ data.item.responsable }}
              </div>
            </template>
            <template v-slot:cell(fecha)="data">{{ data.item.fecha | Date }}</template>
            <template v-slot:cell(pendientes)="data">
              {{ data.item.pendientes }}
            </template>

            <template v-slot:cell()="data">
              <b-button
                :to="'/formacion/experiencias/detalle/' + data.item.uuid + '?estado=3'"
                size="sm"
                variant="success"
                title="Ver detalle"
              >
                <i class="fas fa-award" />
              </b-button>
            </template>
          </b-table>
        </div>
      </b-col>
    </b-row>
  </ContentWrapper>
</template>

<script>
export default {
  meta: {
    auth: { permiso: 'formacion.experiencias' },
  },
  data() {
    return {
      grid: {
        fields: [
          { label: 'Nombre', key: 'experiencia' },
          { label: 'Fecha', key: 'fecha' },
          { label: 'pendientes', key: 'pendientes' },
          { label: 'Opciones', key: 'opciones' },
        ],
        items: [],
      },
    }
  },
  mounted() {
    this.getPendientes()
  },

  methods: {
    getPendientes() {
      this.$axios.get('/formacion/cursos/pendientes').then((response) => {
        this.grid.items = response.data.data
      })
    },
  },
}
</script>
