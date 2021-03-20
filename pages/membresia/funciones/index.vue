<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>
        Listado
        <template slot="acciones">
          <nuxt-link to="/membresia/funciones/formulario" class="btn btn-success btn-sm">
            <i class="fab fa-angellist"></i>
            Agregar Funcion
          </nuxt-link>
        </template>
      </titulo>
    </template>
    <alerta tipo="info">
      Mi Rincón, gestiona automáticamente los permisos de los usuarios en base a las funciones establecidas en cruz del
      sur, pero debido a limitaciones al momento de exportar los datos de cds, desde Mi Rincon solo podemos gestionar 1
      función, por esta razón es importante, que si el educador tiene más de 1 función, se le asigne mediante este
      módulo.
    </alerta>
    <div class="card card-accent-primary">
      <div class="card-body">
        <alerta v-if="options.params.rama === 'G'" tipo="info">
          Por limitacion de la informacion que tiene el aplicativo, cuando se selecciona Rama Gestión, obtiene todas las
          pesonas que no tienen una rama definida
        </alerta>
        <b-form>
          <b-row>
            <b-col sm="12" lg="4">
              <b-form-group label="Ingrese un parametro de busqueda">
                <b-form-input
                  v-model="options.params.query"
                  size="sm"
                  name="documento"
                  placeholder="Nombre o Documento"
                />
              </b-form-group>
            </b-col>
            <b-col sm="12" lg="4">
              <b-form-group label="Listado de Funciones">
                <select v-model="options.params.funcion" class="form-control form-control-sm">
                  <template v-for="funcion in listado_funciones">
                    <option :key="funcion.id" :value="funcion.id">{{ funcion.nombre }}</option>
                  </template>
                </select>
              </b-form-group>
            </b-col>
            <b-col sm="12" lg="12">
              <button class="btn btn-primary" @click.prevent="getBusqueda()">Filtrar</button>
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
        name="tablePersonaListado"
        url="/persona/funcion"
      >
        <template slot="datos" slot-scope="props">
          <div-persona :persona="props.row" />
        </template>
        <template slot="funciones" slot-scope="props">
          <template v-for="(funcion, index) in props.row.funciones">
            <b-col v-if="funcion.origen === 'M'" :key="index" sm="12">
              <strong>{{ funcion.organismo_full }} :</strong>
              <span class="text-success"
                >{{ funcion.funcion }}
                <a
                  class="btn-link text-danger"
                  style="cursor: pointer"
                  title="Eliminar Funcion del Organismo"
                  @click="borrarFuncion(funcion.uuid)"
                >
                  <i class="far fa-trash-alt" />
                </a>
              </span>
            </b-col>
          </template>
        </template>
        <template slot="opciones" slot-scope="props">
          <btn-persona-ver :uuid="props.row.uuid" />
        </template>
      </v-server-table>
    </div>
  </ContentWrapper>
</template>

<script>
export default {
  meta: {
    auth: { permiso: 'membresia.persona' }, //  a futuro agregar gestion.persona.funciones
  },
  data() {
    return {
      listado_funciones: {},
      columns: ['datos', 'funciones', 'opciones'],
      options: {
        filterable: false,
        params: {
          tipo: 'A',
          afiliado: 'S',
        },
        headings: {
          'rel_categoria.nombre': 'Categoria',
          'rel_rama.nombre': 'Rama',
        },
      },
    }
  },
  mounted() {
    this.listadoDeFunciones()
  },
  methods: {
    borrarFuncion(uuid) {
      // @PENDIENTE Egregar dialog de confirmacion
      return this.$axios.delete('/persona/funcion/', { data: { uuid } }).then(() => {
        this.$refs.tabla.data = []
        this.$refs.tabla.loading = true
        this.$refs.tabla.refresh()
      })
    },

    listadoDeFunciones() {
      this.$axios.get('/persona/funcion/listado_manuales').then((response) => {
        this.listado_funciones = response.data
      })
    },

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
.VueTables >>> * tr th:nth-child(1) {
  width: 30% !important;
}

.VueTables >>> * tr th:nth-child(5) {
  width: 30%;
}
</style>
