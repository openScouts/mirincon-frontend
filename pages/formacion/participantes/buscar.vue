<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Buscar Persona</titulo>
    </template>
    <div class="card card-accent-primary">
      <div class="card-body">
        <b-form>
          <b-form-input v-model="buscar" size="sm" name="documento" placeholder="Nombre o Documento" />
          <br />
          <button class="btn btn-primary" @click.prevent="getBusqueda()">Buscar</button>
        </b-form>
      </div>
    </div>
    <hr />
    <div v-show="grid.tableData.length" class="card card-accent-primary">
      <div class="card-body">
        <div class="card-body pt-1">
          <v-client-table :data="grid.tableData" :columns="grid.columns" :options="options">
            <div slot="datos" slot-scope="props">
              <div-persona :persona="props.row" />
            </div>
            <div slot="opciones" slot-scope="props" v-html="props.row.opciones" />
            <template slot="opciones" slot-scope="props">
              <btn-persona-ver :uuid="props.row.uuid" />
            </template>
            <template slot="funciones" slot-scope="props">
              <div-funciones :funciones="props.row.funciones" />
            </template>
          </v-client-table>
        </div>
      </div>
    </div>
  </ContentWrapper>
</template>

<script>
export default {
  meta: {
    auth: { permiso: 'formacion.participantes' },
  },
  data() {
    return {
      grid: {
        columns: ['datos', 'funciones', 'rama', 'categoria', 'opciones'],
        tableData: [],
      },
      options: {
        filterable: ['nombre', 'documento', 'funciones', 'rama'],
      },
      buscar: '',
    }
  },
  methods: {
    getBusqueda() {
      this.$axios.get(`/persona/persona/listado?buscar=${this.buscar}`).then((response) => {
        this.grid.tableData = response.data
      })
    },
  },
}
</script>

<style scoped>
/* Defino el Ancho de la primer columna */
.VueTables >>> * tr th:nth-child(1) {
  width: 25%;
}

.VueTables >>> * tr th:nth-child(3) {
  width: 20%;
}

.VueTables >>> * tr th:nth-child(5) {
  width: 10%;
}
</style>
