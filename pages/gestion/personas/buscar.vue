<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Buscar Persona</titulo>
    </template>
    <div class="card card-accent-primary">
      <div class="card-body">
        <alerta v-if="options.params.rama === 'G'" tipo="info">
          Por limitacion de la informacion que tiene el aplicativo, cuando se selecciona Rama Gestión, obtiene todas las
          pesonas que no tienen una rama definida
        </alerta>
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
            <b-col sm="12" lg="2">
              <b-form-group label="Seleccione un tipo">
                <b-form-select v-model="options.params.categoria" :options="select.categoria" size="sm" class="mb-3" />
              </b-form-group>
            </b-col>
            <b-col sm="12" lg="2">
              <b-form-group label="Seleccione una rama">
                <select-ramas v-model="options.params.rama" size="sm" />
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
            <btn-persona-ver :uuid="props.row.uuid" />
          </template>
        </v-server-table>
      </div>
    </div>
  </ContentWrapper>
</template>

<style scoped>
/* Defino el Ancho de la primer columna*/
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
<script>
export default {
  meta: {
    auth: {
      permiso: 'gestion.persona',
      rol: 'Admin',
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
        categoria: [
          { value: 0, text: 'Todos' },
          { value: 1, text: 'Activo' },
          { value: 2, text: 'Colaborador' },
          { value: 3, text: 'Cooperador' },
          { value: 4, text: 'Asesor' },
          { value: 5, text: 'Honorario' },
          /* { value: '6', text: 'Otra' },
           { value: '7', text: 'Beneficiario' }, */
          { value: 160, text: 'Acompañante' },
        ],
      },
      ver_tabla: false,
      buscar: '',
      tab: 1 /* TAB SELECCIONADA */,
      columns: ['datos', 'funciones', 'rama', 'categoria', 'opciones'],
      options: {
        filterable: false,
        params: {
          tipo: 'A',
          afiliado: 'S',
          categoria: 0,
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
