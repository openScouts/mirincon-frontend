<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Gestion de Permisos</titulo>
    </template>
    <div class="card card-accent-primary">
      <div class="card-body">
        <b-table
          :items="datos.items"
          :fields="datos.fields"
          striped
          hover
          small
          responsive
          class="table-sm no-more-tables"
        >
          <template v-slot:cell(name)="data">{{ data.value }}</template>
          <template v-slot:cell(permisos)="data">
            <template v-for="permiso in permisos">
              <template v-if="validaPermiso(permiso.nombre, data.item.rel_permisos)">
                <b-badge :key="permiso.id" pill variant="success" class="m-1">
                  {{ permiso.nombre }}
                  <a class="btn-link" style="cursor: pointer" @click="permisoQuitar(data.item.id, permiso.id)">
                    <i class="far fa-trash-alt" />
                  </a>
                </b-badge>
              </template>
              <template v-else>
                <b-badge :key="permiso.id" pill variant="light" class="m-1">
                  {{ permiso.nombre }}
                  <a class="btn-link" style="cursor: pointer" @click="permisoAgregar(data.item.id, permiso.id)">
                    <i class="far fa-plus-square" />
                  </a>
                </b-badge>
              </template>
            </template>
          </template>
        </b-table>
      </div>
    </div>
  </ContentWrapper>
</template>

<script>
export default {
  meta: {
    auth: { permiso: 'administrador.permisos' },
  },
  data() {
    return {
      permisos: {},
      datos: {
        // experiencia
        fields: [
          {
            key: 'nombre',
            label: 'Nombre',
            sortable: true,
          },
          {
            key: 'permisos',
            label: 'Permisos',
            sortable: false,
          },
        ],
        items: [],
      },
    }
  },
  computed: {},
  mounted() {
    this.getData()
    this.getPermisos()
  },
  methods: {
    permisoAgregar(FuncionId, PermisoId) {
      const r = confirm('Esta Seguro de querer agregar el permiso ?')
      if (r === true) {
        this.$axios
          .post('/administrador/permisos/permisos', {
            acl_funcion_id: FuncionId,
            acl_permisos_id: PermisoId,
          })
          .then(() => {
            this.getData()
          })
      }
    },
    permisoQuitar(FuncionId, PermisoId) {
      const r = confirm('Esta Seguro de querer Quitar el permiso ?')
      if (r === true) {
        this.$axios
          .delete('/administrador/permisos/permisos', {
            data: {
              acl_funcion_id: FuncionId,
              acl_permisos_id: PermisoId,
            },
          })
          .then(() => {
            this.getData()
          })
      }
    },
    getData() {
      this.$axios.get('/administrador/permisos/funciones').then((response) => {
        this.datos.items = response.data
      })
    },
    validaPermiso(permisoName, permisosRol) {
      return permisosRol.find((value) => {
        return value.nombre === permisoName
      })
    },
    getPermisos() {
      this.$axios.get('/administrador/permisos/permisos').then((response) => {
        this.permisos = response.data
      })
    },
  },
}
</script>
