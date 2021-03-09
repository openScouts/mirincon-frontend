<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Gestion de Insumos</titulo>
    </template>
    <div class="row">
      <div class="col-md-6 col-12">
        <btn-app to="/gestion/insumos/formulario" icon="fas fa-cart-plus"> Nuevo </btn-app>
        <btn-app to="/gestion/insumos/listado" icon="fas fa-layer-group"> Listado </btn-app>
        <btn-app to="/gestion/insumos/solicitar" icon="fas fa-dolly-flatbed"> Solicitar </btn-app>
      </div>
    </div>
  </ContentWrapper>
</template>

<script>
export default {
  meta: {
    auth: { permiso: 'gestion.insumos' },
  },
  components: {},
}
</script>
