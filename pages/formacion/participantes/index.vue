<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>participantes</titulo>
    </template>
    <btn-app to="/formacion/participantes/listado" icon="fa os-accion-educador-list">Listado</btn-app>
    <btn-app to="/formacion/participantes/buscar" icon="fa os-accion-scout-buscar">Buscar</btn-app>
  </ContentWrapper>
</template>

<script>
export default {
  meta: {
    auth: { permiso: 'formacion.participantes' },
  },
}
</script>
