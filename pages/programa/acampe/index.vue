<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Gestion de Permisos de Acampe</titulo>
    </template>
    <div class="row">
      <div class="col-md-6 col-12">
        <btn-app to="/gestion/persona/listado" icon="fa cis-scout-perfil"> Listado </btn-app>
        <btn-app to="/programa/acampe/formulario/" icon="fa cis-obj-carpa"> Nuevo Permiso </btn-app>
        <btn-app to="/gestion/persona/buscar" icon="fa cis-saac-dd"> Autorizaciones </btn-app>
      </div>
    </div>
  </ContentWrapper>
</template>

<script>
export default {
  meta: {
    auth: { permiso: 'programa.acampe' },
  },
}
</script>
