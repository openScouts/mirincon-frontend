<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo><i class="os-accion-evento" />Eventos disponibles para Inscripcion</titulo>
    </template>

    <div class="card card-accent-primary">
      <div class="card-header">Eventos Disponibles dentro de Mi Zona</div>
      <tabla tipo="zona" />
    </div>

    <div class="card card-accent-success">
      <div class="card-header">Eventos Distritales</div>
      <tabla tipo="distrito" />
    </div>

    <div class="card card-accent-info">
      <div class="card-header">Eventos Disponibles de mi Organismo</div>
      <tabla tipo="miorganismo" />
    </div>

    <div class="card card-accent-danger">
      <div class="card-header">Eventos Disponibles Fuera de Mi Zona</div>
      <tabla tipo="otros" />
    </div>
  </ContentWrapper>
</template>
<script>
import Tabla from '~/components/eventos/TablaDisponibles'

export default {
  components: { Tabla },
  head() {
    return {
      titleTemplate: 'Inscripciones de Eventos - %s ',
    }
  },
}
</script>
