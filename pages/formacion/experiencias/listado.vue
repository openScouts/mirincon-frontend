<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Gestión de Talleres y Experiencias de Formación</titulo>
    </template>
    <div class="card card-accent-primary">
      <div class="card-body">
        <template v-if="!user.is.formador">
          <div class="tab-container">
            <b-nav class="nav-tabs" fill>
              <b-nav-item :active="tab === 1" @click="tabs(1, 'activos')">Mis Experiencias</b-nav-item>
              <b-nav-item :active="tab === 2" @click="tabs(2, 'archivados')">Mis Archivados</b-nav-item>
              <b-nav-item :active="tab === 3" @click="tabs(3, 'publicos')">Publicos</b-nav-item>
              <template v-if="$can('SUPERADMIN')">
                <b-nav-item :active="tab === 4" @click="tabs(4, 'borrados')">Borrados</b-nav-item>
                <b-nav-item :active="tab === 5" @click="tabs(5, 'todos')">Todos</b-nav-item>
              </template>
            </b-nav>
          </div>
        </template>
        <v-server-table ref="tabla" :columns="columns" :options="options" url="/formacion/cursos">
          <template slot="fecha" slot-scope="props">{{ props.row.fecha | Date }}</template>
          <template slot="opciones" slot-scope="props">
            <nuxt-link :to="`/formacion/experiencias/detalle/${props.row.uuid}`">Detalle</nuxt-link>
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
      permiso: 'formacion.experiencias',
    },
  },
  data() {
    return {
      columns: ['nombre', 'fecha', 'responsable', 'opciones'],
      tab: 1 /* TAB SELECCIONADA */,
      options: {
        params: {
          tipo: 'activos',
        },
      },
    }
  },
  created() {
    if (this.user.is.formador) {
      this.options.params.tipo = 'FORMADOR'
    }
  },
  methods: {
    tabs(tab, tipo) {
      this.tab = tab
      this.options.params.tipo = tipo
      this.$refs.tabla.data = []
      this.$refs.tabla.loading = true
      this.$refs.tabla.refresh() // recargo pagina cunado cambio tab
    },
  },
}
</script>
