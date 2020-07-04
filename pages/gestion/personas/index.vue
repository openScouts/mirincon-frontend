<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo> <span class="fas os-accion-gestion" /> Persona </titulo>
    </template>
    <div class="row">
      <div class="col-md-6 col-12">
        <btn-app to="/gestion/personas/listado" icon="fa os-accion-educador-list">Listado</btn-app>
        <btn-app to="/gestion/personas/buscar" icon="fa os-accion-scout-buscar">Buscar</btn-app>
      </div>
      <div class="col-md-6 col-12">
        <div class="card card-accent-primary">
          <div class="card-header">Beneficiarios por Rama</div>
          <div class="card-body p-0">
            <pie-generico url="/charts/persona/rama_beneficiarios" />
          </div>
        </div>
      </div>
    </div>
  </ContentWrapper>
</template>

<script>
import pieGenerico from '~/components/genericos/charts/PieGenerico'
export default {
  meta: {
    auth: { permiso: 'gestion.persona' },
  },
  components: { pieGenerico },
}
</script>
