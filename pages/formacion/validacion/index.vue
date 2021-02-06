<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>validacion</titulo>
    </template>
    <btn-app to="/formacion/validacion/formulario" icon="fa os-accion-habilitacion-add"> Cargar </btn-app>
    <btn-app to="/formacion/validacion/listado" icon="fa os-accion-habilitacion-list">Listado</btn-app>
    <hr />
    <b-row>
      <b-col md="12" lg="8">
        <div id="pendientes" class="card card-accent-primary">
          <div class="card-header">validacion Pendientes</div>
          <b-table :fields="grid.fields" :items="grid.items" striped hover small responsive stacked="md">
            <template #cell(datos)="data">
              <div-persona :persona="data.item.persona" />
            </template>
            <template #cell(habilitacion)="data">
              {{ data.item.habilitacion }} <br />
              <span class="text-danger">Pendiente Aval Distrito</span>
            </template>
            <template #cell(creado)="data">{{ data.value | Date }}</template>
            <template #cell(opciones)="data">
              <template v-if="!user.is.grupo">
                <b-button
                  :to="'/formacion/validacion/formulario/' + data.item.uuid"
                  size="sm"
                  variant="success"
                  title="Finalizar Solicitud"
                >
                  <i class="fas fa-award" />
                </b-button>
              </template>
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
    auth: { permiso: 'formacion.validacion' },
  },
  data() {
    return {
      grid: {
        fields: [
          { label: 'Datos', key: 'datos' },
          { label: 'Habilitacion', key: 'habilitacion' },
          { label: 'Fecha Solicitada', key: 'creado' },
          { label: 'opciones', key: 'opciones' },
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
      this.$axios.get('/formacion/validacion/pendientes').then((response) => {
        this.grid.items = response.data.data
      })
    },
  },
}
</script>
