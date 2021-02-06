<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Listado</titulo>
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
      <v-server-table ref="tabla" :columns="columns" :options="options" url="/formacion/carga_manual">
        <template slot="persona.apellidoynombre" slot-scope="props">
          <div-persona :persona="props.row.persona" />
        </template>

        <template slot="funciones" slot-scope="props">
          <div-funciones :funciones="props.row.persona.funciones" />
        </template>

        <template slot="experiencia" slot-scope="props">
          <dl>
            <dd>({{ props.row.organismo_codigo }}) {{ props.row.experiencia }}</dd>
            <dd>fecha: {{ props.row.fecha | Date }}</dd>
            <dd v-if="props.row.rama">Rama: <div-rama :rama="props.row.rama" /></dd>
            <dd v-if="props.row.libro_folio">Libro y Folio: {{ props.row.libro_folio }}</dd>
          </dl>
        </template>
        <template slot="opciones" slot-scope="props">
          <btn-persona-ver :uuid="props.row.persona.uuid" />
        </template>
      </v-server-table>
    </div>
  </ContentWrapper>
</template>

<script>
export default {
  meta: {
    auth: { permiso: 'formacion.carga_manual' },
  },
  data() {
    return {
      tab: 1 /* TAB SELECCIONADA */,
      columns: ['persona.apellidoynombre', 'funciones', 'experiencia', 'opciones'],
      options: {
        filterable: false,
        pagination: { chunk: 10 },
        params: {
          afiliado: 'S',
        },
        headings: {
          'persona.apellidoynombre': 'datos',
        },
        sortable: ['apellidoynombre'],
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

<style>
.VueTables >>> * tr th:nth-child(1) {
  /* Defino el Ancho de la primer columna */
  width: 30%;
}
.VueTables >>> * tr th:nth-child(2) {
  /* Defino el Ancho de la primer columna */
  width: 25%;
}
</style>
