<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Listado</titulo>
    </template>
    <div class="card card-accent-primary">
      <div class="card card-body">
        <div class="tab-container">
          <b-nav class="nav-tabs" fill>
            <b-nav-item :active="tab === 1" @click="tabs(1, 'A', 'S')"> Adultos </b-nav-item>
            <b-nav-item :active="tab === 2" @click="tabs(2, 'B', 'S')"> Beneficiaros </b-nav-item>
            <b-nav-item :active="tab === 3" @click="tabs(3, 'A', 'N')"> Ex Miembros Adultos </b-nav-item>
            <b-nav-item :active="tab === 4" @click="tabs(4, 'B', 'N')"> Ex Miembros Beneficiarios </b-nav-item>
          </b-nav>
        </div>
        <div class="card-body">
          <v-server-table
            ref="tabla"
            :columns="columns"
            :options="options"
            name="tablePersonaListado"
            url="/persona/personas"
          >
            <template slot="datos" slot-scope="props">
              <div-persona :persona="props.row" />
            </template>
            <template slot="funciones" slot-scope="props">
              <div-funciones :funciones="props.row.funciones" />
            </template>
            <template slot="opciones" slot-scope="props">
              <btn-persona-ver :uuid="props.row.uuid" />
            </template>
          </v-server-table>
        </div>
      </div>
    </div>
  </ContentWrapper>
</template>

<script>
export default {
  meta: {
    auth: { permiso: 'membresia.persona' },
  },
  data() {
    return {
      tab: 1 /* TAB SELECCIONADA */,
      columns: ['datos', 'funciones', 'rama', 'categoria', 'opciones'],
      options: {
        params: {
          tipo: 'A',
          afiliado: 'S',
        },
        filterable: ['rama', 'categoria'],
        headings: {
          'rel_categoria.nombre': 'Categoria',
          'rel_rama.nombre': 'Rama',
        },
      },
    }
  },
  mounted() {
    // this.tabs(1,'A','S')
    // this.$refs.tabla.refresh();
  },
  methods: {
    /** ***************************************
       tab => id Tab Seleccionado, por defecto 1
       tipo => Adulto / Beneficiario
       afiliado => Si / No
       *************************************** */
    tabs(tab, tipo, afiliado) {
      this.tab = tab
      this.options.params.tipo = tipo
      this.options.params.afiliado = afiliado
      // Borro toda la tabla y muestro el loading
      this.$refs.tabla.data = []
      this.$refs.tabla.loading = true
      this.$refs.tabla.refresh() // recargo pagina cunado cambio tab
    },
  },
}
</script>

<style scoped>
/* Defino el Ancho de la primer columna */
.VueTables >>> * tr th:nth-child(1) {
  width: 35%;
}

.VueTables >>> * tr th:nth-child(3) {
  width: 5%;
}
.VueTables >>> * tr th:nth-child(4) {
  width: 5%;
}

.VueTables >>> * tr th:nth-child(5) {
  width: 5%;
}
</style>
