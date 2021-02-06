<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo><span class="fas os-accion-habilitacion" /> Listado</titulo>
    </template>
    <div class="card card-accent-primary">
      <div class="card-body">
        <b-row>
          <b-col sm="12" lg="3" class="mb-0">
            <b-form-group label="Ingrese un parametro de busqueda" class="mb-0">
              <b-form-input
                v-model="options.params.query"
                size="sm"
                name="documento"
                placeholder="Nombre o Documento"
              />
            </b-form-group>
          </b-col>
          <b-col sm="12" lg="3" class="mb-0">
            <b-form-group label="Validacion" class="mb-0">
              <select v-model="options.params.tipo" class="form-control">
                <option v-for="(validacion, index) in validaciones" :key="index" :value="validacion.id">
                  {{ validacion.nombre }}
                </option>
              </select>
            </b-form-group>
          </b-col>
          <b-col sm="12" lg="3" class="mb-0">
            <b-form-group label="Estado Afiliacion" class="mb-0">
              <b-form-select v-model="options.params.afiliado" size="sm" class="mb-3">
                <option value="A">Miembros</option>
                <option value="I">Ex Miembros</option>
                <option value="T">Todos</option>
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
      <div class="card-body">
        <v-server-table ref="tabla" :columns="columns" :options="options" url="/formacion/validacion">
          <template slot="apellidoynombre" slot-scope="props">
            <div-persona :persona="props.row" />
          </template>
          <template slot="funciones" slot-scope="props">
            <div-funciones :funciones="props.row.funciones" />
          </template>
          <template slot="validacion" slot-scope="props">
            <template v-for="(habilitacion, index) in props.row.validacion">
              <div :key="index">
                <template v-if="habilitacion.pendiente === null">
                  <span class="text-danger">Pendiente Distrito</span>
                </template>
                {{ habilitacion.habilitacion }} - ({{ habilitacion.linea }})
                <template v-if="index !== habilitacion.length - 1">
                  <br />
                </template>
              </div>
            </template>
          </template>
          <template slot="vencimiento" slot-scope="props">
            {{ props.row.vencimiento | Date }}
          </template>

          <template slot="estado" slot-scope="props">
            <div v-if="$moment(props.row.vencimiento, 'YYYY-MM-DD').isBefore()" class="text-danger">
              <i class="far fa-frown" /> Vencida
            </div>
            <div v-else class="text-success"><i class="far fa-hand-peace" /> Vigente</div>
          </template>
        </v-server-table>
      </div>
    </div>
  </ContentWrapper>
</template>

<script>
export default {
  meta: {
    auth: { permiso: 'formacion.validacion' },
  },

  data() {
    return {
      tab: 1 /* TAB SELECCIONADA */,
      columns: ['apellidoynombre', 'funciones', 'validacion', 'vencimiento', 'estado', 'opciones'],
      options: {
        filterable: false,
        pagination: { chunk: 10 },
        params: {
          afiliado: 'A',
          linea: '',
          estado: 'todas', // Vigente o Vencida .. es igual que las IMs
        },
        headings: {
          apellidoynombre: 'datos',
        },
        sortable: ['apellidoynombre', 'vencimiento'],
      },
    }
  },
  mounted() {
    // concateno el campo de filtrado con las columnas activas
    // this.grid.options.filterable = this.grid.options.filterable.concat(this.grid.columns);
    // this.getData();
    this.getValidaciones()
  },
  methods: {
    getBusqueda() {
      this.$refs.tabla.data = []
      this.$refs.tabla.loading = true
      this.$refs.tabla.refresh()
    },
    getValidaciones() {
      this.$axios.get('varios/formacion/validaciones').then((response) => {
        this.validaciones = response.data
      })
    },
  },
}
</script>

<style scoped>
.VueTables >>> * tr th:nth-child(1) {
  /* Defino el Ancho de la primer columna */
  width: 25%;
}
</style>
