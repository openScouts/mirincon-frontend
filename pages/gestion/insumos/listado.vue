<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo><span class="fas fa-layer-group" /> Listado de Insumos</titulo>
    </template>
    <div class="card card-accent-primary">
      <v-server-table ref="tabla" :columns="columns" url="/gestion/insumos"> </v-server-table>
    </div>
  </ContentWrapper>
</template>

<script>
export default {
  meta: {
    auth: { permiso: 'gestion.insumos' },
  },
  data() {
    return {
      columns: ['nombre', 'direccion', 'localidad', 'telefono', 'opciones'],
    }
  },
}
</script>
