<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Sistema de Novedades</titulo>
    </template>
    <btn-app to="/administrador/novedades/formulario" icon="fa fa-bell">Nuevo</btn-app>
    <hr />
    <div class="card card-accent-primary">
      <v-server-table ref="tabla" :columns="columns" :options="options" url="/administrador/novedades">
        <template slot="mensaje" slot-scope="props">
          <strong>{{ props.row.titulo }}</strong>
          <br />
          {{ props.row.detalle }}
          <br />
          link : {{ props.row.link }}
        </template>
        <template slot="fecha" slot-scope="props">
          <span> Comienza: {{ props.row.f_inicio | Date }}</span>
          <br />
          <span> Finaliza: {{ props.row.f_fin | Date }}</span>
        </template>

        <template slot="opciones" slot-scope="props">
          <nuxt-link
            class="btn btn-success btn-sm"
            :to="'/administrador/novedades/formulario/' + props.row.uuid"
            title="Editar"
          >
            <i class="far fa-edit"></i>
          </nuxt-link>
          <button class="btn btn-danger btn-sm" title="Borrar" @click="borrar(props.row.uuid)">
            <i class="far fa-trash-alt"></i>
          </button>
        </template>
      </v-server-table>
    </div>
  </ContentWrapper>
</template>

<script>
export default {
  meta: {
    auth: { permiso: 'administrador.novedades' },
  },
  data() {
    return {
      columns: ['mensaje', 'fecha', 'opciones'],
      options: {
        filterable: false,
        params: {
          query: '',
        },
      },
    }
  },
  methods: {
    borrar(novedadUuid) {
      this.$axios
        .delete('/administrador/novedades', {
          data: { uuid: novedadUuid },
        })
        .then(() => {
          this.$refs.tabla.refresh()
        })
    },
  },
}
</script>
