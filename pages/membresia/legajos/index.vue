<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Persona</titulo>
    </template>
    <div class="row">
      <div class="col-md-6 col-12">
        <btn-app to="/membresia/legajos/carga_masiva" icon="fa fa-upload"> Carga Masiva </btn-app>
        <btn-app to="/membresia/legajos" icon="fas fa-file-invoice"> Listado </btn-app>
      </div>
      <div class="col-md-6 col-12">
        <div class="card card-accent-primary">
          <div class="card-header">Beneficiarios por Rama</div>
          <div class="card-body p-0"></div>
        </div>
      </div>
    </div>
  </ContentWrapper>
</template>

<script>
export default {
  meta: {
    auth: { permiso: 'membresia.persona' },
  },
  components: {},
}
</script>
