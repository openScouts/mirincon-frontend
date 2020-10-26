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
            <b-form-group label="Estado de la Habiliacion" class="mb-0">
              <b-form-select v-model="options.params.estado" size="sm" class="mb-3">
                <option value="todas" selected>Todas</option>
                <option value="vigentes">Vigentes</option>
                <option value="vencidas">Vencidas</option>
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col sm="12" lg="3" class="mb-0">
            <b-form-group label="Linea de formacion" class="mb-0">
              <b-form-select v-model="options.params.linea" size="sm" class="mb-3">
                <option value selected>Todas</option>
                <option value="PJ">Programa</option>
                <option value="DI">Gestion</option>
              </b-form-select>
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
        <v-server-table ref="tabla" :columns="columns" :options="options" url="/formacion/habilitaciones">
          <template slot="apellidoynombre" slot-scope="props">
            <div-persona :persona="props.row" />
          </template>
          <template slot="funciones" slot-scope="props">
            <div-funciones :funciones="props.row.funciones" />
          </template>
          <template slot="habilitaciones" slot-scope="props">
            <template v-for="(habilitacion, index) in props.row.habilitaciones">
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

<style scoped>
.VueTables >>> * tr th:nth-child(1) {
  /* Defino el Ancho de la primer columna */
  width: 25%;
}
</style>

<script>
export default {
  meta: {
    auth: { permiso: 'formacion.habilitaciones' },
  },
  data() {
    return {
      tab: 1 /* TAB SELECCIONADA */,
      columns: ['apellidoynombre', 'funciones', 'habilitaciones', 'vencimiento', 'estado', 'opciones'],
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
