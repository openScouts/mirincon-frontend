<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Listado</titulo>
    </template>
    <div class="row">
      <div class="col-md-6 col-12">
        <btn-app to="/gestion/funciones/formulario" icon="fa cis-scout-perfil"> Nueva Funcion </btn-app>
      </div>
    </div>
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

<style scoped>
.VueTables >>> * tr th:nth-child(1) {
  width: 30% !important;
}

.VueTables >>> * tr th:nth-child(5) {
  width: 30%;
}
</style>
<script>
export default {
  meta: {
    auth: { permiso: 'gestion.persona' }, //  a futuro agregar gestion.persona.funciones
  },
  data() {
    return {
      tab: 1 /* TAB SELECCIONADA */,
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
  methods: {
    borrarFuncion(uuid) {
      // @PENDIENTE Egregar dialog de confirmacion
      return this.$axios.delete('/persona/funcion/', { data: { uuid } }).then(() => {
        this.$refs.tabla.data = []
        this.$refs.tabla.loading = true
        this.$refs.tabla.refresh()
      })
    },
  },
}
</script>
