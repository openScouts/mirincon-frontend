<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo><span class="fas os-accion-lugar" /> Lugares</titulo>
    </template>
    <btn-app to="/eventos/lugares/formulario" icon="fa os-accion-lugar-add">Nuevo</btn-app>
    <hr />
    <div class="card card-accent-primary">
      <v-server-table ref="tabla" :columns="columns" url="/eventos/lugar">
        <template slot="opciones" slot-scope="props">
          <!--
          <nuxt-link :to="'/eventos/lugares/detalle/' + props.row.uuid">Ver Detalle</nuxt-link>| -->
          <nuxt-link :to="'/eventos/lugares/formulario/' + props.row.uuid">Editar</nuxt-link>
        </template>
      </v-server-table>
    </div>
  </ContentWrapper>
</template>

<script>
export default {
  meta: {
    auth: { permiso: 'eventos.lugares' },
  },
  data() {
    return {
      columns: ['nombre', 'direccion', 'localidad', 'telefono', 'opciones'],
    }
  },
}
</script>
