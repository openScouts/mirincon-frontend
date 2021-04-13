<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Buscar Persona</titulo>
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
              <b-form-group label="Tipo de Acceso">
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
      <v-server-table ref="tabla" :columns="columns" :options="options" url="/administrador/usuarios">
        <template slot="datos" slot-scope="props">
          <div-persona :persona="props.row" />
        </template>
        <template slot="funciones" slot-scope="props">
          <div-funciones :funciones="props.row.funciones" />
        </template>
        <template slot="opciones" slot-scope="props">
          <btn-persona-ver :uuid="props.row.uuid" />
          <button class="btn btn-success btn-sm" title="Cambiar Clave" @click="modalCambiarClave(props.row.uuid)">
            <i class="fas fa-key"></i>
          </button>
        </template>
      </v-server-table>
    </div>
    <modal-password ref="modalPassword" :uuid="membresia_uuid"></modal-password>
  </ContentWrapper>
</template>

<script>
import modalPassword from '@/components/administracion/password.vue'

export default {
  // @PENDIENTE -> Agregar ultimo login
  components: { modalPassword },
  meta: {
    auth: { permiso: 'administrador.usuarios' },
  },
  data() {
    return {
      membresia_uuid: '',
      select: {
        afiliados: [
          { value: 'T', text: 'Todos' },
          { value: 'S', text: 'Afiliados' },
          { value: 'N', text: 'Ex Miembros' },
        ],
        tipo: [
          { value: 'todos', text: 'Todos' },
          { value: 'basico', text: 'Basico' },
          { value: 'permisos', text: 'Con Permisos' },
          { value: 'Beneficiarios', text: 'Beneficiarios' },
        ],
      },
      buscar: '',
      columns: ['datos', 'funciones', 'opciones'],
      options: {
        filterable: false,
        params: {
          query: '',
        },
      },
    }
  },

  methods: {
    getBusqueda() {
      this.$router.push({ query: {} })
      this.$router.push({ query: this.options.params })
      this.$refs.tabla.loading = true
      this.$refs.tabla.refresh()
    },
    modalCambiarClave(uuid) {
      this.membresia_uuid = uuid
      this.$refs.modalPassword.showModal()
    },
  },
}
</script>

<style scoped>
/* Defino el Ancho de la primer columna */
.VueTables >>> * tr th:nth-child(1) {
  width: 40% !important;
}

.VueTables >>> * tr th:nth-child(2) {
  width: 40% !important;
}
</style>
