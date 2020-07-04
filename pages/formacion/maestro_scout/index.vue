<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo> <span class="fas os-accion-im" /> Maestro Scouts </titulo>
    </template>
    <btn-app to="/formacion/maestro_scout/listado" icon="fa os-accion-im-list">Listado</btn-app>
    <btn-app to="/formacion/maestro_scout/formulario" icon="fa os-accion-im-add">Cargar</btn-app>
    <b-row>
      <b-col sm="12" lg="6">
        <div id="pendientes" class="card card-accent-primary">
          <div class="card-header">Im Pendientes</div>
          <b-table :items="grid.items" :fields="grid.fields" striped hover small responsive stacked="md">
            <template v-slot:cell(datos)="data">
              <div-persona :persona="data.item.persona" />
            </template>
            <template v-slot:cell(detalle)="data">
              <strong class="text-muted">{{ data.item.linea }}</strong>
              <p class="text-muted" title="Rama solicitada">Rama: <div-rama :rama="data.item.rama" /></p>
              <p class="text-muted font-italic">Fecha: {{ data.item.f_solicitud | Date }}</p>
            </template>
            <template v-slot:cell(opciones)="data">
              <b-button
                :to="'/formacion/maestro_scout/formulario/' + data.item.uuid"
                size="sm"
                variant="success"
                title="Finalizar Solicitud"
              >
                <i class="fas fa-award" />
              </b-button>
            </template>
          </b-table>
        </div>
      </b-col>

      <b-col sm="12" lg="6">
        <div class="card card-accent-primary">
          <div class="card-header">Cantidad de Ims</div>
          <div class="card-body">
            <pie-generico url="/charts/formacion/im_por_rama" />
          </div>
        </div>
      </b-col>
    </b-row>
  </ContentWrapper>
</template>

<script>
import pieGenerico from '~/components/genericos/charts/PieGenerico'
export default {
  meta: {
    auth: { permiso: 'formacion.maestro_scout' },
  },
  components: { pieGenerico },
  data() {
    return {
      grid: {
        fields: [
          { key: 'datos', label: 'Datos' },
          { key: 'detalle', label: 'detalle' },
          { key: 'opciones', label: 'opciones' },
        ],
        items: [],
      },
    }
  },
  mounted() {
    this.getData()
  },

  methods: {
    getData() {
      this.$axios.get('/formacion/im/pendientes').then((response) => {
        this.grid.items = response.data.data
      })
    },
  },
}
</script>
