<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo><span class="fas os-accion-evento" /> administrador</titulo>
    </template>
    <btn-app to="/eventos/administracion/listado" icon="fa fa-list-alt">Listado</btn-app>
  </ContentWrapper>
</template>

<script>
export default {
  meta: {
    auth: { permiso: 'eventos.administracion' },
  },
  mounted() {
    this.$router.replace('/eventos/administracion/listado')
  },
}
</script>
