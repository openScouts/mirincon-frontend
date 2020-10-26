<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Listado</titulo>
    </template>
    <div class="card card-accent-primary">
      <div class="card-body">
        <b-form>
          <b-row>
            <b-col sm="12" lg="3">
              <b-form-group label="Ingrese un parametro de busqueda">
                <b-form-input v-model="options.params.query" size="sm" name="evento" placeholder="Nombre del Evento" />
              </b-form-group>
            </b-col>
            <b-col sm="12" lg="2">
              <b-form-group label="Area">
                <b-form-select v-model="options.params.area" :options="select.area" size="sm" class="mb-3" />
              </b-form-group>
            </b-col>
            <b-col sm="12" lg="2">
              <b-form-group label="Tipo">
                <b-form-select v-model="options.params.tipo" :options="select.tipo" size="sm" class="mb-3" />
              </b-form-group>
            </b-col>
            <b-col sm="12" lg="2">
              <b-form-group label="Estado">
                <b-form-select v-model="options.params.estado" :options="select.estado" size="sm" class="mb-3" />
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
      <v-server-table
        ref="tabla"
        :columns="columns"
        :options="options"
        name="tableEventosListado"
        url="/eventos/eventos"
      >
        <template slot="datos" slot-scope="props">
          <b-row>
            <b-col sm="2">
              <img :src="'/img/areas/' + props.row.area_codigo.toLowerCase() + '.svg'" width="50" height="50" />
            </b-col>
            <b-col sm="10">
              <strong> {{ props.row.evento }}</strong>
              <div class="text-muted">
                <strong>Area: </strong>
                {{ props.row.area }}
              </div>
              <div class="text-muted">
                <strong>Organismo: </strong>
                {{ props.row.organismo.full }}
              </div>
            </b-col>
          </b-row>
        </template>

        <template slot="informacion" slot-scope="props">
          <div>
            <strong class="text-muted">Cierre Inscripciones: </strong>
            {{ props.row.cierre_inscripcion | Date }}
          </div>
          <div>
            <strong class="text-muted">Inicio del Evento: </strong>
            {{ props.row.fecha_evento | DateTime }}
          </div>
          <div>
            <strong class="text-muted">Responsable: </strong>
            {{ props.row.responsable }}
          </div>
        </template>

        <template slot="estado" slot-scope="props">{{ props.row.estado }}</template>
        <template slot="costo" slot-scope="props">${{ props.row.costo }}</template>

        <template slot="opciones" slot-scope="props">
          <nuxt-link :to="`/eventos/administracion/detalle/${props.row.uuid}`">Detalle</nuxt-link>
        </template>
        <!---->
      </v-server-table>
    </div>
  </ContentWrapper>
</template>

<script>
export default {
  meta: {
    auth: {
      permiso: 'eventos.administracion',
    },
  },
  data() {
    return {
      select: {
        tipo: [
          { value: 'todos_los_zonales', text: 'Todos los Zonales' },
          { value: 'privados', text: 'Mis Eventos' },
          { value: 'distrito', text: 'Distritales' },
          { value: 'zona', text: 'Zonales' },
          { value: 'otros', text: 'Otros' },
          { value: 'todos', text: 'Otros' },
        ],
        area: [
          { value: null, text: 'Todos' },
          { value: 'ams', text: 'Adultos en el Movimiento' },
          { value: 'otros', text: 'Otras Areas' },
        ],
        estado: [
          { value: 'activos', text: 'activos' },
          { value: 'archivados', text: 'archivados' },
          { value: 'borrados', text: 'borrados' },
          { value: 'todos', text: 'todos' },
        ],
      },
      tab: 1 /* TAB SELECCIONADA */,
      columns: ['datos', 'informacion', 'costo', 'estado', 'opciones'],
      options: {
        filterable: false,
        params: {
          tipo: 'todos_los_zonales',
          area: null,
          estado: 'activos',
        },
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
    /** ***************************************
       tab => id Tab Seleccionado, por defecto 1
       *************************************** */
    getBusqueda() {
      //   this.$router.replace({ query: null }) // si no borro NO FUNCIONA !! una Macana
      this.$router.push({ query: {} })
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
