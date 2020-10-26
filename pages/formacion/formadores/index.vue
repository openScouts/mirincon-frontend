<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Formadores</titulo>
    </template>
    <btn-app to="/formacion/formadores/listado" icon="fa os-accion-formador-list">Listado</btn-app>
  </ContentWrapper>
</template>

<script>
export default {
  meta: {
    auth: { permiso: 'formacion.formadores' },
  },
}
</script>
