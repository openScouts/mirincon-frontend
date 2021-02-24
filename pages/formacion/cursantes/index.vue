<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Gestion de Cursantes</titulo>
    </template>
    <div class="card card-accent-primary">
      <div class="card-body">
        <b-form>
          <b-row>
            <b-col sm="12" lg="3">
              <b-form-group label="Ingrese un parametro de busqueda">
                <b-form-input
                  v-model="options.params.query"
                  size="sm"
                  name="documento"
                  placeholder="Nombre o Documento"
                />
              </b-form-group>
            </b-col>

            <b-col sm="12" lg="2">
              <b-form-group label="Seleccione un estado">
                <b-form-select v-model="options.params.afiliado" :options="select.afiliados" size="sm" class="mb-3" />
              </b-form-group>
            </b-col>
            <b-col sm="12" lg="2">
              <b-form-group label="Seleccione un tipo">
                <b-form-select v-model="options.params.tipo" :options="select.tipo" size="sm" class="mb-3" />
              </b-form-group>
            </b-col>
            <b-col sm="12" lg="12">
              <button class="btn btn-primary" @click.prevent="getBusqueda()">Buscar</button>
            </b-col>
          </b-row>
        </b-form>
      </div>
    </div>
    <hr />
    <div class="card card-accent-primary">
      <div v-if="ver_tabla">
        <v-server-table ref="tabla" :columns="columns" :options="options" url="/persona/personas">
          <template slot="datos" slot-scope="props">
            <div-persona :persona="props.row" />
          </template>
          <template slot="funciones" slot-scope="props">
            <div-funciones :funciones="props.row.funciones" />
          </template>
          <template slot="opciones" slot-scope="props">
            <router-link :to="'/formacion/cursantes/detalle/' + props.row.uuid">Ver</router-link>
          </template>
        </v-server-table>
      </div>
    </div>
  </ContentWrapper>
</template>

<script>
export default {
  meta: {
    auth: {
      permiso: 'formacion.cursantes',
    },
  },
  data() {
    return {
      select: {
        afiliados: [
          { value: 'T', text: 'Todos' },
          { value: 'S', text: 'Afiliados' },
          { value: 'N', text: 'Ex Miembros' },
        ],
        tipo: [
          { value: 'T', text: 'Todos' },
          { value: 'A', text: 'Adultos' },
          { value: 'B', text: 'Beneficiarios' },
        ],
      },
      ver_tabla: false,
      buscar: '',
      tab: 1 /* TAB SELECCIONADA */,
      columns: ['datos', 'funciones', 'rama', 'categoria', 'opciones'],
      options: {
        filterable: false,
        params: {
          // A diferencia del modulo de membresia aca solo obtengo la gente que tiene experiencais cargadas
          cursantes_experiencias: true,
          tipo: 'A',
          afiliado: 'S',
          query: '',
        },
        // filterable: ['rel_rama.nombre', 'rel_categoria.nombre'],
      },
    }
  },
  mounted() {
    if (this.$_.size(this.$route.query) !== 0) {
      this.options.params = this.$route.query
      this.getBusqueda()
    }
  },
  methods: {
    getBusqueda() {
      // this.$router.replace({ query: null }) // si no borro NO FUNCIONA !! una Macana
      // this.$router.replace({ query: this.options.params })
      this.$router.push({ query: this.options.params })

      this.ver_tabla = true
      if (this.$refs.tabla !== undefined) {
        this.$refs.tabla.data = []
        this.$refs.tabla.loading = true
        this.$refs.tabla.refresh()
      }
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
