<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Carga Manual de Experiencias de Formacion</titulo>
    </template>
    <btn-app to="/formacion/carga_manual/listado" icon="fa os-accion-formador-list">Listado</btn-app>
    <btn-app to="/formacion/carga_manual/formulario" icon="fa os-accion-formador-add">Cargar Formacion</btn-app>
  </ContentWrapper>
</template>
<script>
export default {
  meta: {
    auth: { permiso: 'formacion.carga_manual' },
  },
}
</script>
